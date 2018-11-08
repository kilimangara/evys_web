import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadCourses } from '../actions/CoursesActions'
import Grid from '@material-ui/core/Grid'

import CourseItem from '../components/courses/CourseItem'
import {CoursesScreenContainer, CoursesWrapper} from "../components/styled/courses";

class CoursesScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            courses: []
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

    // renderItem = (item, index) => {
    //     return (
    //         <ListItem
    //             key={index}
    //             leftAvatar={<Avatar> {item.subject.subject[0]} </Avatar>}
    //             primaryText={item.subject.subject}
    //             onClick={this.loadThemes.bind(this, item.id)}
    //         />
    //     )
    // }

    render() {
        return (
            <CoursesScreenContainer>
            <CoursesWrapper>
                <CourseItem/>
                <CourseItem/>
                <CourseItem/>
                <CourseItem/>
                <CourseItem/>
                <CourseItem/>
                <CourseItem/>
                <CourseItem/>
                <CourseItem/>
                <CourseItem/>
                <CourseItem/>
                <CourseItem/>
            </CoursesWrapper>
            </CoursesScreenContainer>
        )
        // return (
        //     <div style={styles.container}>
        //         <List>
        //             <Subheader inset={true}>Курсы</Subheader>
        //             {this.state.courses.map(this.renderItem)}
        //         </List>
        //     </div>
        // )
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
