import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadThemes } from '../actions/CoursesActions'
import { List, ListItem } from 'material-ui/List'
import ActionInfo from 'material-ui/svg-icons/action/info'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import FileFolder from 'material-ui/svg-icons/file/folder'
import withProviders from "../utils/withProviders";
import {CoursesProvider} from "../mixins/student/CoursesRepository";

class SubThemesScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            subThemes: []
        }
    }

    componentWillMount = () => {
        this.courseId = this.props.match.params['course_id']
        this.themeId = this.props.match.params['theme_id']
        this.props.loadThemes(this.courseId, this.themeId).then(response => {
            this.setState({ subThemes: response.data.data })
        })
    }

    loadStudy = (hasSubThemes, themeId) => {
        if (!hasSubThemes) {
            this.props.history.push(`/app/theme/${themeId}/study`)
        } else {
            this.props.history.push(`/app/course/${this.courseId}/theme/${themeId}/sub_themes`)
        }
    }

    renderItem = (item, index) => {
        return (
            <ListItem
                key={index}
                leftAvatar={<Avatar> {item.theme.name[0]} </Avatar>}
                primaryText={item.theme.name}
                onClick={this.loadStudy.bind(this, item.theme.hasSubThemes, item.theme.id)}
            />
        )
    }

    render() {
        return (
            <div>
                <List>
                    <Subheader inset={true}>Темы</Subheader>
                    {this.state.subThemes.map(this.renderItem)}
                </List>
            </div>
        )
    }
}


withProviders(CoursesProvider)(SubThemesScreen)

// export default connect(
//     mapStateToProps,
//     { loadThemes }
// )(SubThemesScreen)
