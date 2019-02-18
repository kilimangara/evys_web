import { createAction, createReducer } from 'redux-act'
import produce from 'immer'

import { createAccount, getAccounts } from '../../api'

const initialState = {
    accounts: [],
    currentAccount: null
}

export const successCreateAccount = createAction('account/create-account')

export const successLoadAccounts = createAction('account/load-accounts')

export const chooseAccount = createAction('account/choose-account')

export const loadAccounts = () => dispatch => {
    return getAccounts().then(response => {
        dispatch(successLoadAccounts(response.data))
        return response.data
    })
}

export const newAccount = data => dispatch => {
    return createAccount(data).then(response => {
        const account = response.data
        dispatch(successLoadAccounts(account))
        dispatch(chooseAccount(account.permalink))
        return account
    })
}

export default createReducer(
    {
        [successCreateAccount]: (state, account) => produce(state, draft => draft.accounts.push(account)),
        [successLoadAccounts]: (state, accounts) => produce(state, draft => { draft.accounts = accounts }),
        [chooseAccount]: (state, permalink) => {
            if (state.accounts.findIndex(el => el.permalink === permalink) === -1) return state
            return produce(state, draft => { draft.currentAccount = permalink })
        }
    },
    initialState
)
