import React from 'react'
import SubjectRepository, { SubjectProvider } from '../../../mixins/admin/SubjectRepository'
import withNav, { NavigationProvider } from '../../../mixins/admin/NavigatableComponent'
import withProviders from '../../../utils/withProviders'
import styled from 'styled-components'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { theme } from '../../../utils/global_theme'
import produce from 'immer'
import LinearProgress from '@material-ui/core/LinearProgress'
import SaveButton from '../../../components/common/SaveButton'
import { Route } from 'react-router'
import accountBlockedHOC from '../../../mixins/admin/AccountBlockedHOC'
import { compose } from 'recompose'
import { withSnackbar } from 'notistack'
import CheckTestBlockScreen from './check-test-block'
import StudentTestBlocksScreen from './student-test-blocks'
import { InlineDatePicker } from 'material-ui-pickers'
import { ColumnFlexed, RowFlexed } from '../../../components/styled/common'
import format from 'date-fns/format'

const Container = styled.div`
    display: flex;
    padding: 24px 12px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
`

export const ListHeader = styled(ListSubheader)`
    font-weight: 600;
    font-size: 18px;
    color: black;
`

export const ListText = styled(ListItemText)`
    & > span {
        padding-left: 20px;
    }
`

export const Card = styled.div`
    margin-top: ${({ marginTop = 0 }) => `${marginTop}px`};
    border: 1px solid rgba(0, 0, 0, 0.12);
    background-color: white;
    box-shadow: 0 0 1px #bdbfc1, 0 1px #ced2d3;
    padding: ${({ noPadding }) => (noPadding ? '0px' : '12px')};
`

const ColoredButton = styled(Button)`
    background-color: ${theme.ACCENT_COLOR};
    color: white;
`

class SubjectScreen extends SubjectRepository(withNav(React.Component)) {
    constructor(props) {
        super(props)
        this.state = {
            student: null,
            subscription: null
        }
    }

    componentDidMount() {
        this.getStudentBySubject()
        this.getStudentSubcription()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.student !== prevState.student) {
            this.reloadNavigation()
        }
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.reloadNavigation()
        }
    }

    reloadNavigation = () =>
        this.changeNavigation({
            header: `Ученик ${this.state.student.fullName}`,
            backUrl: `/admin/subjects/${this.subjectId()}`
        })

    goTo = type => () => {
        switch (type) {
            case 'tests':
                return this.props.history.replace(
                    `/admin/subjects/${this.subjectId()}/students/${this.studentId()}/tests`
                )
            case 'subscription':
                return this.props.history.replace(
                    `/admin/subjects/${this.subjectId()}/students/${this.studentId()}/subscription`
                )
        }
    }

    subscriptionChanged = field => value => {
        this.setState(
            produce(draft => {
                draft.subscription[field] = value
            })
        )
    }

    saveSubscription = () => {
        this.updateStudentSubcription().then(() => this.subButton.success())
    }

    renderSubscriptionCard = () => {
        const { subscription } = this.state
        if (!subscription)
            return (
                <div>
                    <LinearProgress />
                </div>
            )
        return (
            <Card marginTop={12}>
                <ColumnFlexed align="flex-start">
                    <Typography variant="h6">
                        Подписка с {format(new Date(subscription.startedAt), 'dd.MM.yyyy')}
                    </Typography>
                    <InlineDatePicker
                        onlyCalendar
                        format={'MM.dd.yyyy'}
                        margin={'normal'}
                        variant="outlined"
                        label="Подписка до"
                        value={subscription.endsAt}
                        onChange={this.subscriptionChanged('endsAt')}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                color="primary"
                                checked={subscription.active}
                                onChange={e => this.subscriptionChanged('active')(e.target.checked)}
                                value="active"
                            />
                        }
                        label="Доступ к курсу включен"
                    />
                    <SaveButton ref={ref => (this.subButton = ref)} onClick={this.saveSubscription} />
                </ColumnFlexed>
            </Card>
        )
    }

    render() {
        const { student, searchOpened, themes, query, pickedTheme } = this.state
        if (!student)
            return (
                <div>
                    <LinearProgress />
                </div>
            )
        return (
            <Container>
                <Card>
                    <List subheader={<ListHeader disableSticky>Ученик {student.fullName}</ListHeader>} component="nav">
                        <ListItem button onClick={this.goTo('tests')}>
                            <ListText primary="Пройденные тесты" />
                        </ListItem>
                        <ListItem button onClick={this.goTo('subscription')}>
                            <ListText primary="Управление подпиской" />
                        </ListItem>
                    </List>
                </Card>
                <Route
                    exact
                    path="/admin/subjects/:subjectId(\d+)/students/:studentId(\d+)/tests"
                    component={StudentTestBlocksScreen}
                />
                <Route
                    exact
                    path="/admin/subjects/:subjectId(\d+)/students/:studentId(\d+)/subscription"
                    render={this.renderSubscriptionCard}
                />
                <Route
                    exact
                    path="/admin/subjects/:subjectId(\d+)/students/:studentId(\d+)/tests/:testBlockId(\d+)"
                    component={CheckTestBlockScreen}
                />
            </Container>
        )
    }
}

const enhance = compose(
    accountBlockedHOC,
    withProviders(SubjectProvider, NavigationProvider),
    withSnackbar
)

export default enhance(SubjectScreen)
