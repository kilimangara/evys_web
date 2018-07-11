import {LOGOUT} from './auth'

const initialState = {
  coursesList: [],
  fetching: false
}

export default{
  entry:'~student/courses',
  skipFormat: true,
  initialState,
  reducer(state, action){
    switch(action.type){
      case this.types.index.load:
        return {...state, fetching: true}
      case this.types.index.success:
        return {...state, fetching: false, coursesList: action.payload}
      case this.types.index.failure:
        return {...state, fetching: false}
      case LOGOUT:
        return initialState  
      default:
        return state
    }
  }
}
