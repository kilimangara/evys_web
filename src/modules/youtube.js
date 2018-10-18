const initialState = {
    signedIn: false,
    channelId: null,
    uploadPlaylistId: null
}

export const SAVE_YOUTUBE_DATA = 'SAVE_YOUTUBE_DATA'

export const CLEAR_YOUTUBE_DATA = 'CLEAR_YOUTUBE_DATA'

export default function(state = initialState, action) {
    switch (action.type) {
        case SAVE_YOUTUBE_DATA:
            return { ...state, signedIn: true, channelId: action.channelId, uploadPlaylistId: action.uploadPlaylistId }
        case CLEAR_YOUTUBE_DATA:
            return initialState
        default:
            return state
    }
}
