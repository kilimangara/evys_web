import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadThemes } from '../actions/CoursesActions'
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
        this.id = this.props.match.params["course_id"];
        this.props.loadThemes(this.id).then(
            response => {
                this.setState({ themes: response.data.data });
            }
        );
    }

    loadStudy = () => {
        this.props.history.push('/app/theme_study')
    }

    renderItem = (item, index) => {
        return (
            <ListItem
                key={index}
                leftAvatar={<Avatar> {item.theme.name[0]} </Avatar>}
                primaryText={item.theme.name}
                onClick={this.loadStudy}
            />
        )
    }

    render() {
        return (
            <div>
                <List>
                    <Subheader inset={true}>Темы</Subheader>
                    {this.state.themes.map(this.renderItem)}
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


export default connect(mapStateToProps, { loadThemes })(ThemesScreen)