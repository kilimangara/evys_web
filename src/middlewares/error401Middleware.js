import { exitProfile } from '../actions/AccountActions'
import { USER_APP } from '../modules/apps'

export default store => next => action => {
  const { apps } = store.getState();
  if (apps.currentApp === USER_APP) {
    if (action.response && action.response.response &&  action.response.response.status === 401)
    store.dispatch(exitProfile())
  }
  return next(action);
};
