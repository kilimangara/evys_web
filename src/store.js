import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import reduxThunk from 'redux-thunk'
import { ADMIN_APP, USER_APP } from './utils/constants'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import aReducers from './reducers/admin'
import sReducers from './reducers/student'

const KEY_STORE_MAP = {
  [ADMIN_APP]: 'evysAdminMainAppState',
  [USER_APP]: 'evysMainAppState'
}

const WHITELIST_MAP = {
  [ADMIN_APP]: ['account', 'profile', 'authorization'],
  [USER_APP]: ['auth', 'account', 'courses']
}

const persistConfig = (app) => ({
  key: KEY_STORE_MAP[app],
  storage,
  whitelist: WHITELIST_MAP[app]
})

const middlewares = [reduxThunk]

const enhancers = [applyMiddleware(...middlewares)]

const adminReducers = combineReducers(aReducers)

const studentReducers = combineReducers(sReducers)

export default function setUpStore(app = USER_APP) {
  let reducers = app === ADMIN_APP ? adminReducers : studentReducers
  const persistedReducer = persistReducer(persistConfig(app), reducers)
  const store = createStore(persistedReducer, composeWithDevTools(...enhancers))
  return store
}

export const store = setUpStore(__CURRENT_APP__)
export const persistor = persistStore(store)

console.log(store)

if(__DEV__) global.store = store

// export store
// export persistor
