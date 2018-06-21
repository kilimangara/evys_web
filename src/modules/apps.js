
export const USER_APP = 'USER_APP'
export const ADMIN_APP = 'ADMIN_APP'

export const SWITCH_APP_ACTION = 'SWITCH_APP'

const initialState = {
  currentApp: USER_APP
}

export default function (state=initialState, action){
  switch(action.type){
    case SWITCH_APP_ACTION:
      return {...state, currentApp: action.app}
    default:
      return state
  }
}
