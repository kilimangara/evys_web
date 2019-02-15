import React, { Component } from 'react'
import { relative } from 'path'
import { CenteredContent } from '../components/styled/common'
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
        if (!this.props.currentCourse || this.props.currentCourse.id !== this.courseId) {
            this.props.getCourseById(this.courseId)
        }
        this.props.loadThemes(this.courseId, null).then(response => this.setState({ themes: response }))
    }

    handleCardClick = id => this.props.history.push(`/app/course/${this.courseId}/theme/${id}`)

    render() {
        const { currentCourse } = this.props
        const { themes } = this.state
        return (
            <CenteredContent>
                <ThemesScreenWrapper>
                    <CurrentCourseItem
                        active={true}
                        name={currentCourse && currentCourse.subject && currentCourse.subject.subject}
                        percent={currentCourse && currentCourse.progress}
                        teacherName={currentCourse && currentCourse.owner}
                        subscribeTo={currentCourse && currentCourse.billingInfo && currentCourse.billingInfo.endsAt}
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

export default withProviders(CoursesProvider)(ThemesScreen)
