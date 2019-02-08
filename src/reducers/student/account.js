import { actionTypesFor } from '../../actions/actionTypesFor'

import { getStudentProfile, updateStudentProfile } from '../../api'
import createAction from 'redux-act/src/createAction'
import createReducer from 'redux-act/src/createReducer'

const initialState = {
    profileData: {},
    fetching: false
}

const profileFetch = createAction('account/profile-fetch')
const profileFetchSuccess = createAction('account/profile-fetch-success')
const profileSave = createAction('account/profile-save')
const profileSaveSuccess = createAction('account/profile-save-success')

export const loadProfileData = () => dispatch => {
    dispatch(profileFetch())
    return getStudentProfile().then(response => dispatch(profileFetchSuccess(response.data)))
}

export const saveProfile = data => dispatch => {
    dispatch(profileSave())
    let body = new FormData()
    const { avatar, full_name, email, tags } = data
    debugger
    if (avatar) {
        body.append('avatar', avatar)
    }
    if (full_name) {
        body.append('full_name', data.full_name)
    }
    if (email) {
        body.append('email', email)
    }
    if (tags) {
        body.append('tags', tags)
    }
    return updateStudentProfile(body).then(response => dispatch(profileSaveSuccess(response.data)))
}



export default createReducer(
    {
        [profileFetch]: state => ({ ...state, fetching: true }),
        [profileFetchSuccess]: (state, payload) => ({ ...state, fetching: false, profileData: payload }),
        [profileSave]: state => ({ ...state, fetching: true }),
        [profileSaveSuccess]: (state, payload) => ({ ...state, fetching: false, profileData: payload })
    },
    initialState
)
