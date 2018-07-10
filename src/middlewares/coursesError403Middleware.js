import { goToCoursesPage } from '../actions/CoursesActions'
import { USER_APP } from '../modules/apps'

let isValidAction = action => action.types && action.meta && action.meta.is_course;

export default store => next => action => {
    const { apps } = store.getState();
    if (apps.currentApp === USER_APP) {
      if (isValidAction && action.response && action.response.response &&  action.response.response.status === 403)
      store.dispatch(goToCoursesPage())
    }
    return next(action);
  };
  