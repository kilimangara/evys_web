import { createAction, createReducer } from 'redux-act'
import produce from 'immer'

const initialState = {
    signedIn: false,
    channelId: null,
    uploadPlaylistId: null
}

export const saveYoutubeData = createAction('youtube/save-youtube')
export const clearYoutubeData = createAction('youtube/clear-youtube')

export default createReducer(
    {
        [saveYoutubeData]: (state, youtubeData) =>
            produce(state, draft => {
                draft.signedIn = true
                draft.channelId = youtubeData.channelId
                draft.uploadPlaylistId = youtubeData.uploadPlaylistId
            }),
        [clearYoutubeData]: state => initialState
    },
    initialState
)
