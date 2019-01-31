import { createAction, createReducer } from 'redux-act'
import produce from 'immer'
import { loadProfile, successLoadProfile, createProfile } from './profile'
import {btoa} from 'Base64'

import { getProfileInfo } from '../../api'

const spread = produce(Object.assign)

export const saveToken = createAction('authorization/saveToken')

export const logoutAdmin = createAction('authorization/logoutAdmin')

export const authorize = (username, password) => dispatch => {
  const token = btoa(`${username}:${password}`)
  dispatch(saveToken(token))
  return loadProfile()(dispatch)
                    .catch((err) => {
                      if(err.status === 401) dispatch(saveToken(null))
                      throw err
                    })
}

export const register = (data) => dispatch => {
  const {username, password} = data
  const token = btoa(`${username}:${password}`)
  dispatch(saveToken(token))
  return createProfile(data)(dispatch)
                      .catch((err) => {
                        dispatch(saveToken(null))
                        throw err
                      })
}

const initialState = {
  token: undefined,
  userId: undefined,
  fetching: false
}

export default createReducer(
  {
    [successLoadProfile]: (state, profile) => spread(state, { userId: profile.id }),
    [saveToken]: (state, token) => spread(state, { token }),
    [logoutAdmin]: (state) => spread(state, initialState)
  },
  initialState
)
