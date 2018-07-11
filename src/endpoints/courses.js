import {LOGOUT} from './auth'
export const COURSE_IS_NOT_VALIDE = "COURSE_IS_NOT_VALIDE";
export const COURSE_IS_VALIDE = "COURSE_IS_VALIDE";

const initialState = {
  coursesList: [],
  fetching: false,
  valide_course: true
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
      case COURSE_IS_NOT_VALIDE:
        return {...state, valide_course: false}
      case COURSE_IS_VALIDE:
        return {...state, valide_course: true}
      case LOGOUT:
        return initialState  
      default:
        return state
    }
  }
}
