

export const SWITCH_MANAGER = 'SWITCH_MANAGER'

const initialState = {
  managerOpened: false
}

export default function (state=initialState, action){
  switch(action.type){
    case SWITCH_MANAGER:
      return {...state, managerOpened: !state.managerOpened}
    default:
      return state
  }
}
