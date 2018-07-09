import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadCourses } from '../actions/AccountActions'
import { List, ListItem } from 'material-ui/List'
import ActionInfo from 'material-ui/svg-icons/action/info'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import FileFolder from 'material-ui/svg-icons/file/folder'

class ThemesScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            themes: []
        }
    }

    componentWillMount = () => {
    }

    renderItem = (item, index) => {
        return (
            <ListItem
                leftAvatar={<Avatar> {item.subject.subject[0]} </Avatar>}
                primaryText={item.subject.subject}
            />
                )
    }

    render() {
        return (
            <div>
                <List>
                    <Subheader inset={true}>Темы</Subheader>
                    <ListItem
                        leftAvatar={<Avatar> 1 </Avatar>}
                        primaryText="Тема 1"
                    />
                    <ListItem
                        leftAvatar={<Avatar> 2 </Avatar>}
                        primaryText="Тема 3"
                    />
                    <ListItem
                        leftAvatar={<Avatar> 3 </Avatar>}
                        primaryText="Тема 3"
                    />
                </List>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    profileData: state.account.profileData,
    isAuthenticated: state.auth.authenticated,
    userId: state.auth.user_id
})


export default connect(mapStateToProps, { loadCourses })(CoursesScreen)