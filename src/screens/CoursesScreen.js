import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadCurrentCourses, loadFinishedCourses } from '../actions/CoursesActions'

import CourseItem from '../components/courses/CourseItem'
import { CoursesScreenContainer, CoursesTab, CoursesTabs, CoursesWrapper } from '../components/styled/courses'
import { Loader, LoaderWrapper } from '../components/styled/common'

class CoursesScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            courses: [],
            selectedTab: 0
        }
    }

    componentDidMount = () => {
        this.props.loadCurrentCourses().then(response => {
            this.setState({ courses: response.data.results })
        })
    }

    loadThemes = id => {
        this.props.history.push(`/app/course/${id}/themes`)
    }

    handleChange = (event, value) => {
        this.setState({ selectedTab: value })
    }

    render() {
        const { courses, selectedTab } = this.state
        const { loading } = this.props
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
                        {courses.map(({ id, billing_info, subject, progress, owner }) => (
                            <CourseItem
                                key={id}
                                active={!billing_info.ended}
                                name={subject.subject}
                                percent={progress}
                                teacherName={owner}
                                subscribeTo={billing_info.ends_at}
                                courseImage={subject.category_image}
                            />
                        ))}
                    </CoursesWrapper>
                )}
            </CoursesScreenContainer>
        )
    }
}

const mapStateToProps = state => ({
    profileData: state.account.profileData,
    isAuthenticated: state.auth.authenticated,
    userId: state.auth.user_id,
    loading: state.courses.fetching
})

export default connect(
    mapStateToProps,
    { loadCurrentCourses, loadFinishedCourses }
)(CoursesScreen)
