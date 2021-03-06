import { createAction, createReducer } from 'redux-act'
import produce from 'immer'
import { loadProfile, successLoadProfile, createProfile } from './profile'
import { btoa } from 'Base64'

import { getProfileInfo, logoutAdminSession as logoutSession } from '../../api'

const spread = produce(Object.assign)

export const saveToken = createAction('authorization/saveToken')

export const logoutAdmin = createAction('authorization/logoutAdmin')
export const setAuthType = createAction('authorization/setType')

export const logoutAdminSession = () => dispatch => {
    return logoutSession().then(() => dispatch(logoutAdmin()))
}

export const authorize = (email, password) => dispatch => {
    let authType = 'session'
    if (email && password) {
        const token = btoa(`${email}:${password}`)
        dispatch(saveToken(token))
        authType = 'token'
    }
    dispatch(setAuthType(authType))
    return loadProfile()(dispatch).catch(err => {
        if (err.response.status === 401) {
            dispatch(saveToken(null))
            dispatch(setAuthType(null))
        }
        throw err
    })
}

export const register = data => dispatch => {
    const { email, password } = data
    const token = btoa(`${email}:${password}`)
    dispatch(saveToken(token))
    return createProfile(data)(dispatch).catch(err => {
        dispatch(saveToken(null))
        throw err
    })
}

const initialState = {
    token: undefined,
    userId: undefined,
    fetching: false,
    type: undefined
}

export default createReducer(
    {
        [successLoadProfile]: (state, profile) => spread(state, { userId: profile.id }),
        [saveToken]: (state, token) => spread(state, { token }),
        [logoutAdmin]: state => spread(state, initialState),
        [setAuthType]: (state, type) => spread(state, { type })
    },
    initialState
)
