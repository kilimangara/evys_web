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
                        <div style={styles.course}>
                            <div style={styles.courseBottom}>
                            {/* <div style={{display:'inline-block'}}>
                            <Avatar style={{backgroundColor: 'orange', width: '55px', height: '55px', margin: '10px'}}> НЗ </Avatar>
                            </div> */}
                            {/* <div style={{display:'inline-block', color: 'white'}}>
                            <p> Злакин Н.А. </p>
                            </div> */}
                            <div style={{display:'inline-block', color: 'white', marginLeft:'43%', marginTop:'18px'}}>
                                <p>Основы Python</p>
                                <p style={{fontSize:'11px', marginLeft:'17px', marginTop:'-10px'}}>до 01.04.19</p>
                            </div>
                            <div style={{display:'inline-block', float:'right', marginTop:'44px', marginRight:'3px' , color: 'white'}}>
                            <p>15%</p>
                                </div>
                            </div>
                        </div>
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
    },
    course: {
        borderRadius: '6px',
        marginBottom: '80px',
        paddingTop: '100px',
        backgroundImage: 'url(https://respectbet.com/upload/articles/59d7a723718e7.jpg)',
        backgroundPosition: '30%',
        backgroundSize: 'cover'
    },
    courseBottom: {
        position: relative,
        backgroundColor: 'rgba(64, 64, 64, 0.7)',
        height: '80px',
        borderRadius: '0 0 6px 6px'
    }
}

const mapStateToProps = state => ({
    profileData: state.account.profileData,
    isAuthenticated: state.auth.authenticated,
    userId: state.auth.user_id
})


export default connect(mapStateToProps, { loadThemes })(ThemesScreen)