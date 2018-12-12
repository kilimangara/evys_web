import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadCourseById, loadThemes } from '../actions/CoursesActions'
import { relative } from 'path'
import { CenteredContent } from '../components/styled/common'
import CourseItem from "../components/courses/CourseItem";
import {CurrentCourseItem} from "../components/themes/CurrentCourseItem";
import {ThemeItem} from "../components/themes/ThemeItem";
import {ThemesItemWrapper, ThemesScreenWrapper} from "../components/styled/themes";

class ThemesScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            themes: [],
            course: {
                name: 'test course',
                percent: '25',
                teacherName: 'Dodik T.I'
            }
        }
    }

    componentDidMount() {
        this.course_id = this.props.match.params['course_id']
        this.props.loadThemes(this.course_id, null).then(response => {
            this.setState({ themes: response.data.data })
        })
        Promise.all([this.props.loadThemes(this.course_id, null), this.props.loadCourseById(this.course_id)]).then(
            responses => this.setState({ themes: responses[1].data.data, course: responses[0].data.data  })
        )
    }

    render() {
        const {course} = this.state
        return (<CenteredContent>
            <ThemesScreenWrapper>
            <CurrentCourseItem
                active={true}
                name={course.name}
                percent={course.percent}
                teacherName={course.teacherName}
            />
                <ThemesItemWrapper>
            <ThemeItem alias={'My pisos very big'} percent={100}/>
                    <ThemeItem alias={'My pisos very big'} percent={10}/>
                    <ThemeItem alias={'My pisos very big'} percent={20}/>
                    <ThemeItem alias={'My pisos very big'} percent={30}/>
                    <ThemeItem alias={'My pisos very big'} percent={40}/>
                    <ThemeItem alias={'My pisos very big'} percent={50}/>
                    <ThemeItem alias={'My pisos very big'} percent={60}/>
                    <ThemeItem alias={'My pisos very big'} percent={70}/>
                    <ThemeItem alias={'My pisos very big'} percent={80}/>
                </ThemesItemWrapper>
            </ThemesScreenWrapper>
        </CenteredContent>)
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
