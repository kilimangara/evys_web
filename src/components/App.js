import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import HeaderAppBar from './header_app_bar/HeaderAppBar'
import ProfileScreen from '../screens/ProfileScreen'
import ThemesScreen from '../screens/ThemesScreen'
import CoursesScreen from '../screens/courses/CoursesScreen'
import ThemeStudyScreen from '../screens/ThemeStudyScreen'
import LeftPanel from '../components/common/LeftPanel'
import { CommonWrapper } from './styled/common'
import { StudentAppWrapper } from './styled/layout'
import BeforeStudy from '../screens/BeforeStudy'
import TestQuestionScreen from '../screens/TestQuestionScreen'
import AllCoursesScreen from '../screens/courses/AllCoursesScreen'
import SearchCoursesScreen from '../screens/courses/SearchCoursesScreen'
import withProviders from '../utils/withProviders'
import { AuthorizationProvider } from '../mixins/student/AuthorizationRepository'
import NotFoundPage from '../screens/NotFoundPage'

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
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.valid_course)
        console.log(this.props.valid_course)
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
                    <CommonWrapper>
                        <Switch>
                            <Route exact path="/app/student/courses" component={CoursesScreen} />
                            <Route path="/app/profile" component={ProfileScreen} />
                            <Route exact path={'/app/student/courses/all'} component={AllCoursesScreen} />
                            <Route path={'/app/student/courses/search'} component={SearchCoursesScreen} />
                            <Route exact path="/app/course/:course_id(\d+)/themes" component={ThemesScreen} />
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
                            <Route component={NotFoundPage} />
                        </Switch>
                    </CommonWrapper>
                </div>
            </StudentAppWrapper>
        )
    }
}

export default withProviders(AuthorizationProvider)(App)
