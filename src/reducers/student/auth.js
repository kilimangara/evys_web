import { sendAuthorizeCode, sendCode } from '../../api'
import createAction from 'redux-act/src/createAction'
import createReducer from 'redux-act/src/createReducer'

const initialState = {
    token: undefined,
    fetching: false,
    userId: undefined,
    isNew: false,
    stepIndex: 0
}

const getCodeStart = createAction('auth/load-code')
const getCodeSuccess = createAction('auth/load-code-success')
const sendCodeStart = createAction('auth/load-code')
const sendCodeSuccess = createAction('auth/load-code-success')
const logout = createAction('auth/load-code-success')
const saveNewStepIndex = createAction('auth/save-step-index')

export const getCodeByPhoneNumber = phone => dispatch => {
    dispatch(getCodeStart())
    return sendCode(phone).then(response => dispatch(getCodeSuccess()))
}

export const validateCode = (phone, code) => dispatch => {
    dispatch(sendCodeStart())
    return sendAuthorizeCode(phone, code).then(response => {
        const data = {
            userId: response.data.userId,
            isNew: response.data.isNew,
            token: response.data.token
        }
        dispatch(sendCodeSuccess(data))
    })
}

export const saveStepIndex = index => dispatch => {
    dispatch(saveNewStepIndex(index))
}

export const exitProfile = () => dispatch => dispatch(logout)

export default createReducer(
    {
        [getCodeStart]: state => ({ ...state, fetching: true }),
        [getCodeSuccess]: state => ({ ...state, fetching: false }),
        [sendCodeStart]: state => ({ ...state, fetching: true }),
        [sendCodeSuccess]: (state, payload) => ({ ...state, fetching: false, ...payload }),
        [saveNewStepIndex]: (state, payload) => ({...state, stepIndex: payload}),
        [logout]: state => initialState
    },
    initialState
)
