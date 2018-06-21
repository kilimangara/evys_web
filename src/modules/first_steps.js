import {LOGOUT} from '../endpoints/auth'
const initialState = {
  stepIndex: 0
}

export const SAVE_STEP = 'SAVE_STEP'

export default function (state=initialState, action){
  switch(action.type){
    case SAVE_STEP:
      return {...state, stepIndex:action.index}
    case LOGOUT:
      return initialState  
    default:
      return state
  }
}
