import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadCourseById, loadThemes } from '../actions/CoursesActions'
import { relative } from 'path'
import { CenteredContent } from '../components/styled/common'
import CourseItem from '../components/courses/CourseItem'
import { CurrentCourseItem } from '../components/themes/CurrentCourseItem'
import { ThemeItem } from '../components/themes/ThemeItem'
import { ThemesItemWrapper, ThemesScreenWrapper } from '../components/styled/themes'

class ThemesScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            themes: [],
            course: null
        }
    }

    componentDidMount() {
        this.course_id = this.props.match.params['course_id']
        this.props.loadThemes(this.course_id, null).then(response => {
            this.setState({ themes: response.data.data })
        })
        Promise.all([this.props.loadThemes(this.course_id, null), this.props.loadCourseById(this.course_id)]).then(
            responses => this.setState({ themes: responses[0].data.data, course: responses[1].data.data })
        )
    }

    handleCardClick = id => this.props.history.push(`/app/course/${this.course_id}/theme/${id}`)

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
                        subscribeTo={course && course.billing_info && course.billing_info.ends_at}
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

const mapStateToProps = state => ({
    profileData: state.account.profileData,
    isAuthenticated: state.auth.authenticated,
    userId: state.auth.user_id
})

export default connect(
    mapStateToProps,
    { loadThemes, loadCourseById }
)(ThemesScreen)
