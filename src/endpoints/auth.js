export const LOGOUT = 'LOGOUT'

const initialState = {
    token: undefined,
    authenticated: false,
    fetching: false,
    user_id: undefined,
    is_new: false
}

export default {
    entry: 'student/auth',
    skipFormat: true,
    initialState: initialState,
    reducer(state, action) {
        console.log(action)
        switch (action.type) {
            case this.types.create.load:
                return { ...state, fetching: true }
            case this.types.create.success:
                return { ...state, ...action.payload, authenticated: true, fetching: false }
            case LOGOUT:
                return initialState
            default:
                return state
        }
    }
}
