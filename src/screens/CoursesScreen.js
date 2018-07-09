import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadCourses } from '../actions/CoursesActions'
import { List, ListItem } from 'material-ui/List'
import ActionInfo from 'material-ui/svg-icons/action/info'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import FileFolder from 'material-ui/svg-icons/file/folder'

class CoursesScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            courses: []
        }
    }

    componentWillMount = () => {
        this.props.loadCourses().then(
            response => {
                this.setState({ courses: response.data.data });
            }
        );
    }

    loadThemes = (id) => {
        this.props.updateCourseId(id)
        this.props.history.push('/app/themes')
    }

    renderItem = (item, index) => {
        return (
            <ListItem
                key={index}
                leftAvatar={<Avatar> {item.subject.subject[0]} </Avatar>}
                primaryText={item.subject.subject}
                onClick={this.loadThemes.bind(this, item.subject.id)}
            />
        )
    }

    render() {
        return (
            <div style={styles.container}>
                <List>
                    <Subheader inset={true}>Курсы</Subheader>
                    {this.state.courses.map(this.renderItem)}
                </List>
            </div>
        )
    }
}

const styles = {
    container: {
    },
}

const mapStateToProps = state => ({
    profileData: state.account.profileData,
    isAuthenticated: state.auth.authenticated,
    userId: state.auth.user_id
})


export default connect(mapStateToProps, { loadCourses })(CoursesScreen)