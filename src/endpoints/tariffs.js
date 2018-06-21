import {LOGOUT} from './auth'

const initialState = {
  tariffList: [],
  fetching: false,
  page: 1
}

export default{
  entry:'~tariffs',
  skipFormat: true,
  initialState,
  reducer(state, action){
    switch(action.type){
      case this.types.index.load:
        return {...state, fetching: true}
      case this.types.index.success:
        return {...state, tariffList: action.payload, fetching: false}
      case this.types.index.failure:
        return {...state, fetching: false}
      case LOGOUT:
        return initialState  
      default:
        return state
    }
  }
}
