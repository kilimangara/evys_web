import { createAction, createReducer } from 'redux-act'
import produce from 'immer'

import { createAccount, getAccounts } from '../../api'
import { logoutAdmin } from './authorization'

const initialState = {
    accounts: [],
    currentAccount: null,
    currentAccountBlocked: false
}

export const successCreateAccount = createAction('account/create-account')

export const successLoadAccounts = createAction('account/load-accounts')

export const chooseAccount = createAction('account/choose-account')

export const logoutAccount = createAction('account/logout-account')

export const changeBlockedAccount = createAction('account/change-blocked-account')

export const loadAccounts = () => dispatch => {
    return getAccounts().then(response => {
        dispatch(successLoadAccounts(response.data))
        return response.data
    })
}

export const newAccount = data => dispatch => {
    return createAccount(data).then(response => {
        const account = response.data
        dispatch(chooseAccount(account.permalink))
        return account
    })
}

export default createReducer(
    {
        [successCreateAccount]: (state, account) => produce(state, draft => draft.accounts.push(account)),
        [successLoadAccounts]: (state, accounts) => {
            const account = accounts.find(el => el.permalink === state.currentAccount)
            return produce(state, draft => {
                draft.accounts = accounts
                if (account) draft.currentAccountBlocked = account.blocked
            })
        },
        [chooseAccount]: (state, permalink) => {
            const account = state.accounts.find(el => el.permalink === permalink)
            if (!account) return state
            return produce(state, draft => {
                draft.currentAccount = permalink
                draft.currentAccountBlocked = account.blocked
            })
        },
        [changeBlockedAccount]: (state, payload) =>
            produce(state, draft => {
                draft.currentAccountBlocked = payload
            }),
        [logoutAdmin]: state => initialState,
        [logoutAccount]: state =>
            produce(state, draft => {
                draft.currentAccount = null
                draft.currentAccountBlocked = false
            })
    },
    initialState
)
