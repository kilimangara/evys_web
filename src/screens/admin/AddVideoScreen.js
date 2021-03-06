import React from 'react'
import { connect } from 'react-redux'
import PickYoutubeVideo from '../../components/youtube/PickYoutubeVideo'
import { addTheoryVideo } from '../../reducers/admin/themes'
import accountBlockedHOC from '../../mixins/admin/AccountBlockedHOC'
import { compose } from 'recompose'

class AddVideoScreen extends React.Component {
    constructor(props) {
        super(props)
        const params = new URLSearchParams(this.props.location.search)
        this.theoryId = params.get('theory_id')
        this.themeId = this.props.match.params['themeId']
    }

    saveVideoCallback = (videoName, videoURL) => {
        const data = {
            youtube_video: videoURL,
            name: videoName,
            attachment_type: 'youtube'
        }
        this.props
            .createVideo(this.theoryId, data)
            .then(res => {
                console.log(res)
                this.props.history.push(`/admin/themes/${this.themeId}/theory`)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        if (!this.theoryId) return null
        return <PickYoutubeVideo playlistId={this.props.playlistId} videoPicked={this.saveVideoCallback} />
    }
}

const mapStateToProps = state => ({
    playlistId: state.youtube.uploadPlaylistId
})

const mapDispatchToProps = {
    createVideo: addTheoryVideo
}

const enhance = compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    accountBlockedHOC
)

export default enhance(AddVideoScreen)
