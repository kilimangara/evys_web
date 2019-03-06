import { saveYoutubeData, clearYoutubeData } from '../../reducers/admin/youtube'

export class YoutubeProvider {
    static mapStateToProps = state => ({
        isSigned: state.youtube.signedIn,
        channelId: state.youtube.channelId,
        uploadPlaylistId: state.youtube.uploadPlaylistId
    })

    static mapDispatchToProps = {
        saveYoutubeData,
        clearYoutubeData
    }
}
