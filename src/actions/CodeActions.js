import {actionTypesFor} from 'trivial-redux';
import {SAVE_STEP} from '../modules/first_steps'

export function getCode(phone){
  return {
    types: actionTypesFor('show', 'auth'),
    meta:{
      fetch:{
        url: '~student/code',
        data:{phone},
        method:'POST'
      }
    }
  }
}

export function sendCode(phone, code){
  return {
    types: actionTypesFor('create', 'auth'),
    meta:{
      fetch:{
        url: '~student/auth',
        data:{phone, code},
        method:'POST'
      }
    }
  }
}

export function saveStepIndex(index){
  return{
    type: SAVE_STEP,
    index
  }
}
