import { LOGOUT_ADMIN } from './auth_admin'

const initialState = {
    page: 1,
    subjectsList: [],
    fetching: false,
    totalPages: 1
}

export default {
    entry: `~admin2/subjects`,
    skipFormat: true,
    initialState,
    reducer(state, action) {
        switch (action.type) {
            case this.types.index.load:
                return { ...state, fetching: true, subjectList: [] }
            case this.types.index.success:
                const { page } = action.meta
                return {
                    ...state,
                    fetching: false,
                    subjectsList: action.payload.results,
                    page: page + 1,
                    totalPages: action.payload.count
                }
            case this.types.index.failure:
                return { ...state, fetching: false }
            default:
                return state
        }
    }
}
