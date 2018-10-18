import { LOGOUT_ADMIN } from './auth_admin'

const initialState = {
    companyList: [],
    currentCompany: undefined
}

export const CHOOSE_COMPANY = 'CHOOSE_COMPANY'

export default {
    entry: '~accounts',
    initialState,
    reducer(state, action) {
        switch (action.type) {
            case this.types.index.success:
                return { ...state, companyList: action.payload }
            case CHOOSE_COMPANY:
                return { ...state, currentCompany: action.permalink }
            case LOGOUT_ADMIN:
                return initialState
            default:
                return state
        }
    }
}
