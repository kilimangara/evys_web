import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadCourseById, loadThemes } from '../actions/CoursesActions'
import { relative } from 'path'
import { CenteredContent } from '../components/styled/common'
import CourseItem from '../components/courses/CourseItem'
import { CurrentCourseItem } from '../components/themes/CurrentCourseItem'
import { ThemeItem } from '../components/themes/ThemeItem'
import { ThemesItemWrapper, ThemesScreenWrapper } from '../components/styled/themes'
import withProviders from '../utils/withProviders'
import { CoursesProvider } from '../mixins/student/CoursesRepository'

class ThemesScreen extends Component {
    state = {
        themes: [],
        course: null
    }

    componentDidMount() {
        this.courseId = this.props.match.params['course_id']
        console.log('id', this.courseId)
        // this.props.loadThemes(this.courseId, null).then(response => {
        //     this.setState({ themes: response.data })
        // })
        Promise.all([this.props.loadThemes(this.courseId, null), this.props.getCourseById(this.courseId)]).then(
            responses => this.setState({ themes: responses[0], course: responses[1] })
        )
    }

    handleCardClick = id => this.props.history.push(`/app/course/${this.courseId}/theme/${id}`)

    render() {
        const { course, themes } = this.state
        console.log('themes', themes)
        return (
            <CenteredContent>
                <ThemesScreenWrapper>
                    <CurrentCourseItem
                        active={true}
                        name={course && course.subject && course.subject.subject}
                        percent={course && course.progress}
                        teacherName={course && course.owner}
                        subscribeTo={course && course.billingInfo && course.billingInfo.endsAt}
                    />
                    <ThemesItemWrapper>
                        {themes &&
                            themes.map(({ progress, theme, id }) => (
                                <ThemeItem
                                    alias={theme.name}
                                    percent={progress}
                                    onClick={() => this.handleCardClick(id)}
                                />
                            ))}
                    </ThemesItemWrapper>
                </ThemesScreenWrapper>
            </CenteredContent>
        )
    }
}

// const mapStateToProps = state => ({
//     profileData: state.account.profileData,
//     isAuthenticated: state.auth.authenticated,
//     userId: state.auth.user_id
// })

export default withProviders(CoursesProvider)(ThemesScreen)

// export default connect(
//     mapStateToProps,
//     { loadThemes, loadCourseById }
// )(ThemesScreen)
