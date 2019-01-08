import { createAction, createReducer } from 'redux-act'
import produce from 'immer'

import { getProfileInfo } from '../../api'

const spread = produce(Object.assign)

const initialState = {
    profileData: {},
    fetching: false
}

export const startLoadProfile = createAction('profile/start-load-profile')

export const successLoadProfile = createAction('profile/success-load-profile')

export const loadProfile = () => dispatch => {
    dispatch(startLoadProfile())
    return getProfileInfo().then(response => {
        dispatch(successLoadProfile(response.data))
    })
}

export default createReducer(
    {
        [startLoadAccount]: (state, payload) => spread(state, { fetching: true }),
        [successFetchAccount]: (state, payload) =>
            produce(state, draft => {
                draft.profileData = payload
            })
    },
    initialState
)
