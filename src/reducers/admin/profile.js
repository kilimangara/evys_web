import { createAction, createReducer } from 'redux-act'
import produce from 'immer'
import JivoApi from '../../utils/jivo-api'

import { profileInfo, createUser } from '../../api'

const spread = produce(Object.assign)

const initialState = {
    profileData: {},
    fetching: false
}

export const startLoadProfile = createAction('profile/start-load-profile')

export const successLoadProfile = createAction('profile/success-load-profile')

export const failureLoadProfile = createAction('profile/failure-load-profile')

export const loadProfile = () => dispatch => {
    dispatch(startLoadProfile())
    return profileInfo().then(response => {
        dispatch(successLoadProfile(response.data))
        setTimeout(() => {
            const jivoData = {
                name: response.data.fullName,
                email: response.data.email
            }
            new JivoApi().setContactInfo(jivoData)
        }, 15000)
    })
}

export const createProfile = data => dispatch => {
    dispatch(startLoadProfile())
    return createUser(data)
        .then(response => {
            dispatch(successLoadProfile(response.data))
        })
        .catch(err => {
            dispatch(failureLoadProfile())
            throw err
        })
}

export default createReducer(
    {
        [startLoadProfile]: (state, payload) => spread(state, { fetching: true }),
        [successLoadProfile]: (state, payload) =>
            produce(state, draft => {
                draft.profileData = payload
                draft.fetching = false
            }),
        [failureLoadProfile]: (state, payload) => spread(state, { fetching: false })
    },
    initialState
)
