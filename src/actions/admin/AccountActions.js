import {actionTypesFor} from '../actionTypesFor'
import {SAVE_TOKEN} from '../../endpoints/admin/auth_admin'
import {btoa} from 'Base64'
import {CHOOSE_COMPANY} from '../../endpoints/admin/company_admin'
import {LOGOUT_ADMIN} from '../../endpoints/admin/auth_admin'

export function logoutAction(){
  return {
    type: LOGOUT_ADMIN
  }
}

export function createUser(data){
  return {
    types: actionTypesFor('show', 'account_admin'),
    meta: {
      fetch: {
        url: `~admin2/create_user`,
        method: 'POST',
        data
      }
    }
  }
}

export function loadAccount(){
  return {
    types: actionTypesFor('show', 'account_admin'),
    meta: {
      fetch: {
        url: '~admin2/info'
      }
    }
  }
}

export function saveCredentials(login, password){
  const token = btoa(`${login}:${password}`)
  return {
    type: SAVE_TOKEN,
    token
  }
}

export function resetCredentials(){
  return {
    type: SAVE_TOKEN,
    token: undefined
  }
}

export function createCompany(data){
  return {
    types: actionTypesFor('create', 'company_admin'),
    meta: {
      fetch: {
        url: `~admin2/accounts`,
        method: 'POST',
        data
      }
    }
  }
}

export function loadCompanies(){
  return {
    types: actionTypesFor('index', 'company_admin'),
    meta: {
      fetch: {
        url: '~admin2/accounts'
      }
    }
  }
}

export function chooseCompany(permalink){
  return {
    type: CHOOSE_COMPANY,
    permalink
  }
}
