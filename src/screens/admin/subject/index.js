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
import MainInfo from './main-info'
import BillingInfo from './billing-info'
import Chip from '@material-ui/core/Chip'
import Warning from '@material-ui/icons/Warning'
import ThemesScreen from '../theme/themes-list'
import StudentsManagementScreen from './student-management'
import accountBlockedHOC from '../../../mixins/admin/AccountBlockedHOC'
import { compose } from 'recompose'
import { withSnackbar } from 'notistack'

const WarningIcon = styled(Warning)`
    color: red;
`

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

export const TagChip = styled(Chip)`
    margin: 8px;
    background-color: ${theme.ACCENT_COLOR};
    color: white;
    border: 1px solid ${theme.ACCENT_COLOR};
`

class SubjectScreen extends SubjectRepository(withNav(React.Component)) {
    state = {
        errors: {},
        categories: []
    }

    componentDidMount() {
        this.getSubject()
        this.syncCategories()
    }

    componentDidUpdate(prevProps) {
        if (this.props.subject !== prevProps.subject) {
            this.reloadNavigation()
            this.setState({ subject: this.props.subject })
        }
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.reloadNavigation()
        }
    }

    reloadNavigation = () =>
        this.changeNavigation({ header: `Курс ${this.props.subject.subject}`, backUrl: '/admin/subjects' })

    subjectUpdated = subject => {
        this.setState({ subject })
    }

    updateSubjectPhoto = image => {
        const fd = new FormData()
        fd.append('main_image', image)
        this.props.updateSubject(this.subjectId(), fd)
    }

    saveSubject = () => {
        return this.updateSubject()
            .then(() => this.setState({ errors: {} }))
            .catch(err => {
                const { response } = err
                if (response.status === 400) this.setState({ errors: response.data })
                throw err
            })
    }

    renderMainInfo = () => {
        return (
            <MainInfo
                subject={this.state.subject}
                subjectUpdated={this.subjectUpdated}
                saveSubject={this.saveSubject}
                fetching={this.props.subjectsFetching}
                categories={this.state.categories}
                onPhotoChange={this.updateSubjectPhoto}
            />
        )
    }

    renderBillingInfo = () => {
        return (
            <BillingInfo
                errors={this.state.errors.tariff}
                subject={this.state.subject}
                subjectUpdated={this.subjectUpdated}
                saveSubject={this.saveSubject}
                fetching={this.props.subjectsFetching}
            />
        )
    }

    goTo = type => () => {
        const { subject } = this.state
        switch (type) {
            case 'root':
                return this.props.history.replace(`/admin/subjects/${this.subjectId()}`)
            case 'billing':
                return this.props.history.replace(`/admin/subjects/${this.subjectId()}/billing`)
            case 'themes':
                return this.props.history.replace(`/admin/subjects/${this.subjectId()}/themes`)
            case 'students':
                return this.props.history.replace(`/admin/subjects/${this.subjectId()}/students`)
            case 'subscribe':
                return this.props.history.push(
                    `/admin/students?tariff_id=${subject.tariff.id}&tariff_name=${subject.subject}`
                )
        }
    }

    changeVisibility = () => {
        const { subject } = this.state
        this.state = produce(this.state, draft => {
            draft.subject.tariff.hidden = !draft.subject.tariff.hidden
        })
        this.saveSubject()
    }

    onSubjectDelete = () => {
        this.deleteSubject()
            .then(() => {
                this.props.history.replace('/admin/subjects')
                this.props.enqueueSnackbar(`Курс удален`)
            })
            .catch(error => {
                this.props.enqueueSnackbar(`Что-то пошло не так`, { variant: 'error' })
            })
    }

    render() {
        const { subject, categories } = this.state
        if (!subject || !categories)
            return (
                <div>
                    <LinearProgress />
                </div>
            )
        return (
            <Container>
                <Card>
                    <List subheader={<ListHeader disableSticky>Настройки курса</ListHeader>} component="nav">
                        <ListItem button onClick={this.goTo('root')}>
                            <ListText primary="Основные настройки" />
                        </ListItem>
                        <ListItem button onClick={this.goTo('themes')}>
                            <ListText primary="Содержание курса" />
                        </ListItem>
                        <ListItem button onClick={this.goTo('billing')}>
                            <ListText primary="Информация для ученика" />
                            {!subject.tariff.canPublish ? <WarningIcon /> : null}
                        </ListItem>
                        <ListItem button onClick={this.goTo('students')}>
                            <ListText primary="Мои ученики" />
                        </ListItem>
                        <ListItem button onClick={this.goTo('subscribe')}>
                            <ListText primary="Записать своих учеников" />
                        </ListItem>
                        <Divider />
                        <div style={{ marginLeft: 16, marginTop: 8 }}>
                            <ColoredButton
                                variant="contained"
                                disabled={!subject.tariff.canPublish}
                                margin="normal"
                                onClick={this.changeVisibility}
                            >
                                {this.isHidden() ? 'Опубликовать курс' : 'Скрыть курс'}
                            </ColoredButton>
                            {!subject.tariff.canPublish && (
                                <p style={{ color: 'red' }}>Некоторых данных не хватает для публикации</p>
                            )}
                        </div>
                        <div style={{ marginLeft: 16, marginTop: 8 }}>
                            <Button variant="contained" color="secondary" onClick={this.onSubjectDelete}>
                                Удалить курс
                            </Button>
                        </div>
                    </List>
                </Card>
                <Route exact path="/admin/subjects/:subjectId(\d+)/themes" component={ThemesScreen} />
                <Route exact path="/admin/subjects/:subjectId(\d+)/students" component={StudentsManagementScreen} />
                <Route exact path="/admin/subjects/:subjectId(\d+)" render={this.renderMainInfo} />
                <Route exact path="/admin/subjects/:subjectId(\d+)/billing" render={this.renderBillingInfo} />
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
