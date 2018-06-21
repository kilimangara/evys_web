import {actionTypesFor} from 'trivial-redux'
import {LOGOUT} from './auth'

const initialState = {
  chartStats:undefined,
  suggestions: [],
  lastRepeats: [],
  chartFetching: false,
  suggestionsFetching: false,
  lastRepeatsFetching: false
}

const suggestionsAction = actionTypesFor('suggestions', 'stats')
const repeatsAction = actionTypesFor('repeats', 'stats')

export default {
  entry: 'stats',
  initialState,
  skipFormat: true,
  reducer(state, action){
    switch(action.type){
      case this.types.index.success:
        return {...state, chartFetching: false, chartStats:action.payload}
      case repeatsAction.success:
        return {...state, lastRepeatsFetching: false, lastRepeats: action.payload}
      case suggestionsAction.sucess:
        return {...state, suggestionsFetching: false, suggestions: action.payload}
      case LOGOUT:
        return initialState  
      default:
        return state
    }
  }
}
