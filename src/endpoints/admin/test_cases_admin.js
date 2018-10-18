import { LOGOUT_ADMIN } from './auth_admin'

const initialState = {
    testCaseList: [],
    fetching: false
}

export default {
    entry: `~admin2/subjects`,
    skipFormat: true,
    initialState,
    reducer(state, action) {
        switch (action.type) {
            case this.types.index.load:
                return { ...state, testCaseList: [] }
            case this.types.index.success:
                return { ...state, testCaseList: action.payload }
            case LOGOUT_ADMIN:
                return initialState
            default:
                return state
        }
    }
}
