import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadCurrentCourses, loadFinishedCourses } from '../actions/CoursesActions'

import CourseItem from '../components/courses/CourseItem'
import { CoursesScreenContainer, CoursesTab, CoursesTabs, CoursesWrapper } from '../components/styled/courses'
import { Loader, LoaderWrapper } from '../components/styled/common'
import CoursesMixin, { CoursesProvider } from '../mixins/student/CoursesRepository'
import withProviders from '../utils/withProviders'

class CoursesScreen extends CoursesMixin(Component) {
    state = {
        courses: [],
        selectedTab: 0
    }

    componentDidMount = () => {
        this.props.getCurrentCourses()
    }

    loadThemes = id => {
        this.props.history.push(`/app/course/${id}/themes`)
    }

    handleChange = (event, value) => {
        this.setState({ selectedTab: value })
        if (value === 0) {
            this.props.getCurrentCourses().then(response => {
                this.setState({ courses: response.data.results })
            })
        } else if (value === 1) {
            this.props.getFinishedCourses().then(response => {
                this.setState({ courses: response.data.results })
            })
        }
    }

    render() {
        const { selectedTab } = this.state
        const { loading, coursesList } = this.props
        return (
            <CoursesScreenContainer>
                <CoursesTabs value={selectedTab} fullWidth onChange={this.handleChange}>
                    <CoursesTab label={'Текущие'} />
                    <CoursesTab label={'Пройденые'} />
                </CoursesTabs>
                {loading ? (
                    <LoaderWrapper>
                        <Loader />
                    </LoaderWrapper>
                ) : (
                    <CoursesWrapper>
                        {coursesList &&
                            coursesList.map(({ id, billingInfo, subject, progress, owner }) => (
                                <CourseItem
                                    key={id}
                                    ended={billingInfo.ended}
                                    name={subject.subject}
                                    percent={progress}
                                    teacherName={owner}
                                    subscribeTo={billingInfo.endsAt}
                                    courseImage={subject.categoryImage}
                                />
                            ))}
                    </CoursesWrapper>
                )}
            </CoursesScreenContainer>
        )
    }
}

export default withProviders(CoursesProvider)(CoursesScreen)
