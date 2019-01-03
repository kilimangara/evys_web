import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import reduxThunk from 'redux-thunk'
import { ADMIN_APP, USER_APP } from './modules/apps'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

KEY_STORE_MAP = {
  [ADMIN_APP]: 'evysAdminMainAppState',
  [USER_APP]: 'evysMainAppState'
}

WHITELIST_MAP = {
  [ADMIN_APP]: [],
  [USER_APP]: []
}

const persistConfig = (app) => ({
  key: KEY_STORE_MAP[app],
  storage,
  whitelist: WHITELIST_MAP[app]
})

const middlewares = [reduxThunk]

const enhancers = [applyMiddleware(...middlewares)]

const adminReducers = combineReducers(Object.assign({}))

const studentReducers = combineReducers(Object.assign({}))

export default function setUpStore(app = USER_APP) {
  const reducers = app == ADMIN_APP ? adminReducers : studentReducers
  const persistedReducer = persistReducer(persistConfig(app), reducers)
  const store = createStore(persistedReducer, composeWithDevTools(...enhancers))
  if(__DEV__) global.store = store
  return store
}

const store = setUpStore(CURRENT_APP)
const persistor = persistStore(store)

export store
export persistor
