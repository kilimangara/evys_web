import { createAction, createReducer } from 'redux-act'
import produce from 'immer'

import { getYandexMoneyAccount, saveYandexMoneyAccount } from '../../application_api'

const spread = produce(Object.assign)

export const saveToken = createAction('application/save-token')
export const saveName = createAction('application/save-name')

export const logoutApplication = createAction('application/logout')
export const saveAccountInfo = createAction('application/save-account')

const initialState = {
    token: undefined,
    accountName: undefined,
    account: null
}

export const loadAccount = () => dispatch => {
    return getYandexMoneyAccount().then(response => {
        dispatch(saveAccountInfo(response.data))
        return response.data
    })
}

export const saveAccount = data => dispatch => {
    return saveYandexMoneyAccount(data).then(response => {
        dispatch(saveAccountInfo(response.data))
        return response.data
    })
}

export default createReducer(
    {
        [saveAccountInfo]: (state, account) => spread(state, { account }),
        [saveToken]: (state, token) => spread(state, { token }),
        [saveName]: (state, accountName) => spread(state, { accountName }),
        [logoutApplication]: state => spread(state, initialState)
    },
    initialState
)
