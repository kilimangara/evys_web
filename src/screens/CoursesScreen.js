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
          <div style={{flexGrow:1, display: 'flex', flexDirection:'column', justifyContent:'center'}}>
                <Grid container spacing={24} direction='row'>
                    <Grid item xs style={{display:'flex', justifyContent:'center'}} >
                        <CourseItem />
                    </Grid>
                    <Grid item xs={12} sm={4} style={{display:'flex', justifyContent:'center'}}  >
                        <CourseItem />
                    </Grid>
                    <Grid item xs={12} sm={4} style={{display:'flex', justifyContent:'center'}}  >
                        <CourseItem active={false} />
                    </Grid>
                    <Grid item xs={12} sm={4} style={{display:'flex', justifyContent:'center'}}  >
                        <CourseItem />
                    </Grid>
                    <Grid item xs={12} sm={4} style={{display:'flex', justifyContent:'center'}}  >
                        <CourseItem />
                    </Grid>
                    <Grid item xs={12} sm={4} style={{display:'flex', justifyContent:'center'}}  >
                        <CourseItem />
                    </Grid>
                    <Grid item xs={12} sm={4} style={{display:'flex', justifyContent:'center'}}  >
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

const mapStateToProps = state => ({
    profileData: state.account.profileData,
    isAuthenticated: state.auth.authenticated,
    userId: state.auth.user_id
})

export default connect(
    mapStateToProps,
    { loadCourses }
)(CoursesScreen)
