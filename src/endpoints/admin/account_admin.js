import {LOGOUT_ADMIN} from './auth_admin'


const initialState = {
  profileData: {},
  fetching: false
}

export default {
  entry:`~admin2/info`,
  skipFormat: true,
  initialState,
  reducer(state, action){
    switch(action.type){
      case this.types.show.load:
        return {...state, fetching: true}
      case this.types.show.success:
        return {...state, profileData: action.payload, fetching: false}
      case this.types.show.failure:
        return {...state, fetching: false}
      case LOGOUT_ADMIN:
        return initialState
      default:
        return state
    }
  }
}
