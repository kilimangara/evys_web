import {actionTypesFor} from '../../actions/actionTypesFor'

export const LOGOUT_ADMIN = "LOGOUT_ADMIN"
export const SAVE_TOKEN = 'ADMIN_SAVE_TOKEN'

const initialState = {
  token: undefined,
  authenticated: false,
  user_id: undefined
};

export default {
  entry: "admin2/info",
  skipFormat: true,
  initialState: initialState,
  reducer(state, action) {
    const infoActions = actionTypesFor('show', 'account_admin')
    switch (action.type) {
      case infoActions.success:
        return {...state, authenticated: true, fetching: false, user_id: action.payload.id}
      case SAVE_TOKEN:
        return {...state, token: action.token}
      case LOGOUT_ADMIN:
        return initialState;
      default:
        return state;
    }
  }
};
