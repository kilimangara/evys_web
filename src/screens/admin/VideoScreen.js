import React from 'react'
import { connect } from 'react-redux'
import ReactPlayer from 'react-player'
import { getVideos } from '../../actions/admin/ThemesActions'

class VideoScreen extends React.Component {
    constructor(props) {
        super(props)
        const params = new URLSearchParams(this.props.location.search)
        console.log(params, params.get('v'))
        this.theoryId = this.props.match.params['theory_id']
        this.videoIndex = parseInt(params.get('v'))
        this.state = {
            videos: []
        }
    }

    componentDidMount() {
        this.props.getVideos(this.theoryId).then(res => this.setState({ videos: [...res.data.data] }))
    }

    getURL = () => {
        const video = this.state.videos[this.videoIndex]
        console.log(video, this.videoIndex, this.state.videos)
        if (!video) return null
        return video.youtube_video
    }

    render() {
        console.log(this.state)
        const url = this.getURL()
        if (!url) return null
        return (
            <div style={styles.container}>
                <ReactPlayer
                    width={'100%'}
                    height={'90%'}
                    url={url}
                    playing
                    youtubeConfig={{ playerVars: { controls: 2 } }}
                />
            </div>
        )
    }
}

const styles = {
    container: {
        padding: '0px 0px',
        display: 'flex',
        flex: 1,
        height: '100%'
    }
}

export default connect(
    null,
    { getVideos }
)(VideoScreen)
