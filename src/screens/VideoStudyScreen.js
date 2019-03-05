import React, { Component } from 'react'
import { CenteredContent } from '../components/styled/common'
import ReactPlayer from 'react-player'
import withProviders from '../utils/withProviders'
import { CoursesProvider } from '../mixins/student/CoursesRepository'

export class VideoStudyScreen extends Component {
    state = {
        video: null
    }

    constructor(props) {
        super(props)
        this.themeId = this.props.match.params['theme_id']
        this.courseId = this.props.match.params['course_id']
        this.videoId = this.props.match.params['video_id']
    }

    componentDidMount() {
        this.props.loadThemeVideos(this.themeId).then(response => {
            response.forEach(video => console.log(video, video.id, video.id === parseInt(this.videoId)))
            this.setState({ video: response.find(video => video.id === parseInt(this.videoId)) })
        })
    }

    render() {
        const { video } = this.state
        console.log('v', video)
        return <CenteredContent>{video && <ReactPlayer src={video.youtubeVideo} />}</CenteredContent>
    }
}

export default withProviders(CoursesProvider)(VideoStudyScreen)
