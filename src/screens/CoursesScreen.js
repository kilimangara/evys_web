import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadCourses } from '../actions/CoursesActions'
import Grid from '@material-ui/core/Grid'

import CourseItem from '../components/courses/CourseItem'

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
            <div style={styles.container}>
                <Grid container spacing={16}>
                    <Grid item xs={12} sm={4}>
                        <CourseItem />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <CourseItem />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <CourseItem active={false} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <CourseItem />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <CourseItem />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <CourseItem />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <CourseItem />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <CourseItem />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <CourseItem active={false} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <CourseItem />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <CourseItem />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <CourseItem />
                    </Grid>
                </Grid>
            </div>
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

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '16px 10%',
        flex: 1
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
