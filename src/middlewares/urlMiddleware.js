import { cloneDeep } from "lodash"
import {ADMIN_APP, USER_APP} from '../modules/apps'

let isValidFetchingAction = action => action.types && action.meta && action.meta.fetch && action.meta.fetch.url;

const BASE_URL = __DEV__ ? 'http://localhost:8000/api/' : 'https://evys.ru/api/'

export const toEndPointUrl = url => `${BASE_URL}${url.substr(1)}`

export default store => next => action => {
  if (__DEV__) console.log(action)
  if (isValidFetchingAction(action) && action.meta.fetch.url[0] == "~") {
    const { auth, auth_admin, apps, company_admin } = store.getState();
    action = cloneDeep(action);
    action.meta.fetch.url = toEndPointUrl(action.meta.fetch.url);
    if(apps.currentApp === ADMIN_APP){
      if(auth_admin.token){
        action.meta.fetch.headers = {
          Authorization: `Basic ${auth_admin.token}`,
          'Account-Name': company_admin.currentCompany
        }
      }
    } else {
      action.meta.fetch.headers = {
        Authorization: `Student ${auth.token}`
      }
    }
    return next(action);
  }
  return next(action);
};
