import { createAction, createReducer } from 'redux-act'
import produce from 'immer'

import { profileInfo } from '../../api'

const spread = produce(Object.assign)

const initialState = {
    profileData: {},
    fetching: false
}

export const startLoadProfile = createAction('profile/start-load-profile')

export const successLoadProfile = createAction('profile/success-load-profile')

export const loadProfile = () => dispatch => {
    dispatch(startLoadProfile())
    return profileInfo().then(response => {
        dispatch(successLoadProfile(response.data))
    })
}

export default createReducer(
    {
        [startLoadProfile]: (state, payload) => spread(state, { fetching: true }),
        [successLoadProfile]: (state, payload) =>
            produce(state, draft => {
                draft.profileData = payload
            })
    },
    initialState
)
