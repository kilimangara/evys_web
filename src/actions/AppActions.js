import {SWITCH_APP_ACTION, ADMIN_APP, USER_APP} from '../modules/apps'

export function switchAdminApp(){
  return {
    type: SWITCH_APP_ACTION,
    app: ADMIN_APP
  }
}

export function switchUserApp(){
  return {
    type: SWITCH_APP_ACTION,
    app: USER_APP
  }
}
