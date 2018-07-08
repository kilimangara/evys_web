import {actionTypesFor} from 'trivial-redux'
import {LOGOUT} from '../endpoints/auth'

export function loadProfileData(){
  return {
    types: actionTypesFor('show', 'account'),
    meta: {
      fetch: {
        url: `~student/info`,
      }
    }
  }
}

export function saveProfile(data){
  return {
    types: actionTypesFor('update', 'account'),
    meta: {
      fetch: {
        url: '~student/info',
        data,
        method: 'PUT'
      }
    }
  }
}

export function loadCourses(){
  return {
    types: actionTypesFor('show', 'account'),
    meta: {
      fetch: {
        url: `~student/courses`,
      }
    }
  }
}

export function exitProfile(){
  return {
    type: LOGOUT
  }
}
