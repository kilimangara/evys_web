import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadCourses } from '../actions/CoursesActions'

import CourseItem from '../components/courses/CourseItem'
import { CoursesScreenContainer, CoursesTab, CoursesTabs, CoursesWrapper } from '../components/styled/courses'

class CoursesScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            courses: [],
            selectedTab: 1
        }
    }

    componentWillMount = () => {
        this.props.loadCourses().then(response => {
            this.setState({ courses: response.data.data })
        })
    }

    loadThemes = id => {
        this.props.history.push(`/app/course/${id}/themes`)
    }

    handleChange = (event, value) => {
        this.setState({ selectedTab: value })
    }

    render() {
        return (
            <CoursesScreenContainer>
                <CoursesTabs value={this.state.selectedTab} fullWidth onChange={this.handleChange}>
                    <CoursesTab label={'Текущие'} />
                    <CoursesTab label={'Пройденые'} />
                </CoursesTabs>
                <CoursesWrapper>
                    <CourseItem />
                    <CourseItem />
                    <CourseItem />
                    <CourseItem />
                    <CourseItem />
                    <CourseItem />
                    <CourseItem />
                    <CourseItem />
                    <CourseItem />
                    <CourseItem />
                    <CourseItem />
                    <CourseItem />
                </CoursesWrapper>
            </CoursesScreenContainer>
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
    { loadCourses }
)(CoursesScreen)
