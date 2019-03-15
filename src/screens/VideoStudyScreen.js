import React, { Component } from 'react'
import { CenteredContent } from '../components/styled/common'
import ReactPlayer from 'react-player'
import withProviders from '../utils/withProviders'
import { CoursesProvider } from '../mixins/student/CoursesRepository'
import { VideoWrapper } from '../components/styled/themes'

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
        return (
            <CenteredContent height={'100%'}>
                {video && (
                    <VideoWrapper>
                        <ReactPlayer
                            width={'100%'}
                            height={'100%'}
                            style={{ position: 'absolute', top: '0', left: '0' }}
                            playing
                            controls
                            url={video.youtubeVideo}
                        />
                    </VideoWrapper>
                )}
            </CenteredContent>
        )
    }
}

export default withProviders(CoursesProvider)(VideoStudyScreen)
