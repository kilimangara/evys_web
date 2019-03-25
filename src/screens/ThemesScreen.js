import React, { Component } from 'react'
import { relative } from 'path'
import { CenteredContent, Loader } from '../components/styled/common'
import { CurrentCourseItem } from '../components/themes/CurrentCourseItem'
import { ThemeItem } from '../components/themes/ThemeItem'
import { ThemesItemWrapper, ThemesScreenWrapper } from '../components/styled/themes'
import withProviders from '../utils/withProviders'
import { CoursesProvider } from '../mixins/student/CoursesRepository'
import withRouter from 'react-router/es/withRouter'
import { withSnackbar } from 'notistack'

class ThemesScreen extends Component {
    state = {
        themes: [],
        course: null
    }

    componentDidMount() {
        this.fetchThemes()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location.search !== this.props.location.search) {
            this.fetchThemes()
        }
    }

    fetchThemes = () => {
        this.courseId = this.props.match.params['course_id']
        const params = new URLSearchParams(this.props.location.search)
        const parentTheme = parseInt(params.get('parent'))
        if (!this.props.currentCourse || this.props.currentCourse.id !== this.courseId) {
            this.props.getCourseById(this.courseId)
        }
        this.props
            .loadThemes(this.courseId, parentTheme || null)
            .then(response => this.setState({ themes: response }))
            .catch(err => {
                if (err.response.data.status_code === 403) {
                    this.props.enqueueSnackbar(err.response.data.description, { variant: 'error' })
                    this.props.history.push('/app/courses')
                }
            })
    }

    handleCardClick = (id, type) => {
        this.props.history.push(
            type === 'Section'
                ? `/app/course/${this.courseId}/themes?parent=${id}`
                : `/app/course/${this.courseId}/theme/${id}`
        )
    }

    render() {
        const { currentCourse, coursesFetching } = this.props
        const { themes } = this.state
        return coursesFetching ? (
            <CenteredContent height={'100%'}>
                <Loader />
            </CenteredContent>
        ) : (
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
                                    key={id}
                                    alias={theme.name}
                                    percent={progress}
                                    hidden={theme.isHidden}
                                    onClick={() =>
                                        this.handleCardClick(theme.type === 'Section' ? theme.id : id, theme.type)
                                    }
                                />
                            ))}
                    </ThemesItemWrapper>
                </ThemesScreenWrapper>
            </CenteredContent>
        )
    }
}

export default withProviders(CoursesProvider)(withSnackbar(withRouter(ThemesScreen)))
