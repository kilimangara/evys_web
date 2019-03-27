import React from 'react'
import SubjectRepository, { SubjectProvider } from '../../../mixins/admin/SubjectRepository'
import withNav, { NavigationProvider } from '../../../mixins/admin/NavigatableComponent'
import withProviders from '../../../utils/withProviders'
import styled from 'styled-components'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
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
    state = {
        student: null
    }

    componentDidMount() {
        this.getStudentBySubject()
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

    render() {
        const { student } = this.state
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
                        <Divider />
                        <div style={{ marginLeft: 16, marginTop: 8 }}>
                            <ColoredButton variant="contained" margin="normal">
                                Назначить задание
                            </ColoredButton>
                        </div>
                    </List>
                </Card>
                <Route
                    exact
                    path="/admin/subjects/:subjectId(\d+)/students/:studentId(\d+)/tests"
                    component={StudentTestBlocksScreen}
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
