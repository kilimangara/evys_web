import { LOGOUT_ADMIN } from './auth_admin'

const initialState = {
    totalPages: 1,
    studentList: []
}

export default {
    entry: '~admin2/students',
    skipFormat: true,
    initialState,
    reducer(state, action) {
        switch (action.type) {
            case this.types.index.success:
                return { ...state, studentList: action.payload.results, totalPages: action.payload.count }
            case LOGOUT_ADMIN:
                return initialState
            default:
                return state
        }
    }
}
