import {LOGOUT} from './auth'
export const COURSE_IS_NOT_VALID = "COURSE_IS_NOT_VALID";
export const COURSE_IS_VALID = "COURSE_IS_VALID";

const initialState = {
  coursesList: [],
  fetching: false,
  valid_course: true
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
      case COURSE_IS_NOT_VALID:
        return {...state, valid_course: false}
      case COURSE_IS_VALID:
        return {...state, valid_course: true}
      case LOGOUT:
        return initialState  
      default:
        return state
    }
  }
}
