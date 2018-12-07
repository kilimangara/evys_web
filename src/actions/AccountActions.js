import { actionTypesFor } from './actionTypesFor'
import { LOGOUT } from '../endpoints/auth'

export function loadProfileData() {
    return {
        types: actionTypesFor('show', 'account'),
        meta: {
            fetch: {
                url: `~student/info`
            }
        }
    }
}

export function saveProfile(data) {
    const body = new FormData()
    const { avatar, full_name, email, tags } = data
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
    return {
        types: actionTypesFor('update', 'account'),
        meta: {
            fetch: {
                url: '~student/info',
                data: body,
                method: 'PUT'
            }
        }
    }
}

export function exitProfile() {
    return {
        type: LOGOUT
    }
}
