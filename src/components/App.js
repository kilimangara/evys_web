import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import HeaderAppBar from './header_app_bar/HeaderAppBar'
import ProfileScreen from '../screens/ProfileScreen'
import ThemesScreen from '../screens/ThemesScreen'
import CoursesScreen from '../screens/courses/CoursesScreen'
import ThemeStudyScreen from '../screens/ThemeStudyScreen'
import LeftPanel from '../components/common/LeftPanel'
import { CommonWrapper } from './styled/common'
import { AppContainer, StudentAppWrapper } from './styled/layout'
import BeforeStudy from '../screens/BeforeStudy'
import TestQuestionScreen from '../screens/TestQuestionScreen'
import AllCoursesScreen from '../screens/courses/AllCoursesScreen'
import SearchCoursesScreen from '../screens/courses/SearchCoursesScreen'
import withProviders from '../utils/withProviders'
import { AuthorizationProvider } from '../mixins/student/AuthorizationRepository'
import NotFoundPage from '../screens/NotFoundPage'
import { SnackbarProvider } from 'notistack'
import { studentTheme } from '../utils/global_theme'
import withStyles from '@material-ui/core/styles/withStyles'
import CourseScreen from '../screens/courses/CourseScreen'
import VideoStudyScreen from '../screens/VideoStudyScreen'
import NotificationsScreen from '../screens/NotificationsScreen'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    componentWillMount() {
        // this.props.switchUserApp()
        if (!this.props.token) {
            this.props.history.push('/login')
        }
        window.__localeId__ = 'ru'
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps.valid_course)
        // console.log(this.props.valid_course)
        // if (!nextProps.authenticated && nextProps.authenticated != this.props.authenticated) {
        //     this.props.history.push('/login')
        // }
        // if (!nextProps.valid_course && nextProps.valid_course != this.props.valid_course) {
        //     this.props.history.push('/app/courses')
        // }
    }

    handleToggle = () => this.setState({ open: !this.state.open })

    handleClose = () => this.setState({ open: false })

    goToProfile = () => {
        this.handleClose()
        this.props.history.push('/app/profile')
    }

    goToTariffs = () => {
        this.handleClose()
        this.props.history.push('/app/tariffs')
    }

    goToCourses = () => {
        this.handleClose()
        this.props.history.push('/app/courses')
    }

    goToDashboard = () => {
        this.handleClose()
        this.props.history.push('/app')
    }

    linkToLogin = () => {
        this.handleClose()
        this.props.history.push('/app/login')
    }

    exitProfile = () => {
        this.props.exitProfile()
        this.handleClose()
        this.props.history.push('/app/login')
    }

    render() {
        const { authenticated } = this.props

        return (
            <StudentAppWrapper>
                <LeftPanel />
                <div
                    style={{
                        display: 'flex',
                        height: '102%',
                        flexDirection: 'column',
                        width: '100%',
                        overflow: 'auto'
                    }}
                >
                    <HeaderAppBar />
                    <SnackbarProvider
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right'
                        }}
                        classes={{
                            variantSuccess: this.props.classes.success,
                            variantError: this.props.classes.error,
                            variantWarning: this.props.classes.warning,
                            variantInfo: this.props.classes.info
                        }}
                        maxSnack={5}
                    >
                        <CommonWrapper>
                            <Switch>
                                <Route exact path="/app/courses" component={CoursesScreen} />
                                <Route exact path="/app/notifications" component={NotificationsScreen} />
                                <Route path="/app/profile" component={ProfileScreen} />
                                <Route exact path="/app/courses/all" component={AllCoursesScreen} />
                                <Route path="/app/courses/search" component={SearchCoursesScreen} />
                                <Route exact path="/app/course/:course_id(\d+)/themes" component={ThemesScreen} />
                                <Route exact path="/app/course/:course_id(\d+)" component={CourseScreen} />
                                <Route
                                    exact
                                    path="/app/course/:course_id(\d+)/theme/:theme_id(\d+)"
                                    component={BeforeStudy}
                                />
                                <Route
                                    exact
                                    path="/app/course/:course_id(\d+)/theme/:theme_id(\d+)/theory"
                                    component={ThemeStudyScreen}
                                />
                                <Route
                                    exact
                                    path="/app/course/:course_id(\d+)/theme/:theme_id(\d+)/test"
                                    component={TestQuestionScreen}
                                />
                                <Route
                                    exact
                                    path="/app/course/:course_id(\d+)/theme/:theme_id(\d+)/theory/videos/:video_id(\d+)"
                                    component={VideoStudyScreen}
                                />
                                <Route component={NotFoundPage} />
                            </Switch>
                        </CommonWrapper>
                    </SnackbarProvider>
                </div>
            </StudentAppWrapper>
        )
    }
}

const styles = theme => ({
    success: { backgroundColor: studentTheme.ACCENT, color: studentTheme.BACKGROUND },
    error: { backgroundColor: studentTheme.ERROR },
    warning: { backgroundColor: studentTheme.ACCENT_LIGHT },
    info: { backgroundColor: studentTheme.CONTRAST_LIGHT }
})

export default withProviders(AuthorizationProvider)(withStyles(styles)(App))
