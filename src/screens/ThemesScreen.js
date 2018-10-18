import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadThemes } from '../actions/CoursesActions'
import { List, ListItem } from 'material-ui/List'
import ActionInfo from 'material-ui/svg-icons/action/info'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import FileFolder from 'material-ui/svg-icons/file/folder'

import Grid from '@material-ui/core/Grid'
import { relative } from 'path'
import ThemesItem from '../components/themes/ThemesItem'
import CourseHeader from '../components/courses/CourseHeader'

class ThemesScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            themes: []
        }
    }
    //     componentWillMount = () => {
    //         this.course_id = this.props.match.params["course_id"];
    //         this.props.loadThemes(this.course_id, null).then(
    //             response => {
    //                 this.setState({ themes: response.data.data });
    //             }
    //         );
    //     }

    //     loadStudy = (has_sub_themes, theme_id) => {
    //         if (!has_sub_themes) {
    //             this.props.history.push(`/app/theme/${theme_id}/study`)
    //         } else {
    //             this.props.history.push(`/app/course/${this.course_id}/theme/${theme_id}/sub_themes`)
    //         }
    //     }

    // renderItem = (item, index) => {
    //     return (
    //         <ListItem
    //             key={index}
    //             leftAvatar={<Avatar> {item.theme.name[0]} </Avatar>}
    //             primaryText={item.theme.name}
    //             onClick={this.loadStudy.bind(this, item.theme.has_sub_themes, item.theme.id)}
    //         />
    //     )
    // }

    render() {
        return (
            // <div>
            //     <List>
            //         <Subheader inset={true}>Темы</Subheader>
            //         {this.state.themes.map(this.renderItem)}
            //     </List>
            // </div>

            <div style={styles.container}>
                <Grid container spacing={8}>
                    <Grid item xs={12} sm={12}>
                        <CourseHeader />
                    </Grid>
                </Grid>
                <h1> Темы </h1>
                <Grid container spacing={8}>
                    <Grid item xs={12} sm={4}>
                        <ThemesItem />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <ThemesItem />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <ThemesItem />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <ThemesItem />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <ThemesItem />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <ThemesItem />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <ThemesItem />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '16px 15%',
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
    { loadThemes }
)(ThemesScreen)
