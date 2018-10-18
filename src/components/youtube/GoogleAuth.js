import React from 'react'
import { connect } from 'react-redux'
import { saveYoutubeData, clearYoutubeData } from '../../actions/admin/YoutubeActions'

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', this.initClient)
    }

    initClient = () => {
        window.GoogleAuth = null
        gapi.client
            .init({
                apiKey: 'AIzaSyD8qqvO9gccmAy7VKcm4Bwft6VAqCD_mHc',
                clientId: '725287187728-3d92jf7im6s9hqegp9b3kh0i2c11jnj8.apps.googleusercontent.com',
                scope:
                    'https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtubepartner',
                discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
            })
            .then(() => {
                window.GoogleAuth = gapi.auth2.getAuthInstance()
                window.GoogleAuth.isSignedIn.listen(this.updateSigninStatus)
                if (window.GoogleAuth.isSignedIn.Ab) this.afterSignedIn()
            })
    }

    updateSigninStatus = isSignedIn => {
        console.log('ISSIGNED UPDATE', isSignedIn)
        if (isSignedIn) this.afterSignedIn()
        else this.afterUnsigned()
    }

    afterSignedIn = async () => {
        const channel = (await this.loadChannels()).result.items[0]
        if (!channel) return null
        const channelId = channel.id
        const uploadPlaylistId = channel.contentDetails.relatedPlaylists.uploads
        this.props.saveYoutubeData(channelId, uploadPlaylistId)
        return { channelId, uploadPlaylistId }
    }

    afterUnsigned = () => {
        this.props.clearYoutubeData()
    }

    loadChannels() {
        return window.gapi.client.youtube.channels.list({
            mine: true,
            part: 'snippet, contentDetails'
        })
    }

    render() {
        return null
    }
}

export default connect(
    null,
    { saveYoutubeData, clearYoutubeData }
)(GoogleAuth)
