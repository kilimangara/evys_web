import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadSubThemes } from '../actions/CoursesActions'
import { List, ListItem } from 'material-ui/List'
import ActionInfo from 'material-ui/svg-icons/action/info'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import FileFolder from 'material-ui/svg-icons/file/folder'

class SubThemesScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sub_themes: []
        }
    }

    componentWillMount = () => {
        this.course_id = this.props.match.params["course_id"];
        this.theme_id = this.props.match.params["theme_id"];
        this.props.loadSubThemes(this.course_id, this.theme_id).then(
            response => {
                this.setState({ sub_themes: response.data.data });
            }
        );
    }

    loadStudy = (has_sub_themes, theme_id) => {
        this.props.history.push(`/app/theme/${theme_id}/study`)
    }

    renderItem = (item, index) => {
        return (
            <ListItem
                key={index}
                leftAvatar={<Avatar> {item.theme.name[0]} </Avatar>}
                primaryText={item.theme.name}
                onClick={this.loadStudy.bind(this, item.theme.has_sub_themes, item.theme.id)}
            />
        )
    }

    render() {
        return (
            <div>
                <List>
                    <Subheader inset={true}>Темы</Subheader>
                    {this.state.sub_themes.map(this.renderItem)}
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


export default connect(mapStateToProps, { loadSubThemes })(SubThemesScreen)