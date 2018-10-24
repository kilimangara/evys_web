import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import reduxThunk from 'redux-thunk'
import unwrapMiddleware from './middlewares/unwrapMiddleware'
import urlMiddleware from './middlewares/urlMiddleware'
import axiosMiddleware from "./middlewares/axiosMiddleware";
import { studentAPI, adminAPI } from './api'
import moduleReducers from './modules'
import { ADMIN_APP, USER_APP } from './modules/apps'
import { composeWithDevTools } from 'redux-devtools-extension'

const middlewares = [reduxThunk, urlMiddleware, axiosMiddleware, unwrapMiddleware]

const enhancers = [applyMiddleware(...middlewares)]

const adminReducers = combineReducers(Object.assign({}, adminAPI.reducers, moduleReducers))

const studentReducers = combineReducers(Object.assign({}, studentAPI.reducers, moduleReducers))

export default function setUpStore(app = USER_APP) {
    const appState = app == ADMIN_APP ? 'evysAdminMainAppState' : 'evysMainAppState'
    const state = localStorage.getItem(appState)
    return state ? getStatedStorage(state, app) : getDefaultStorage(app)
}

function getDefaultStorage(app) {
    const reducers = app == ADMIN_APP ? adminReducers : studentReducers
    const store = createStore(reducers, {}, composeWithDevTools(...enhancers))
    global.store = store
    return store
}

function getStatedStorage(state, app) {
    const reducers = app == ADMIN_APP ? adminReducers : studentReducers
    const jsonState = JSON.parse(state)
    const store = createStore(reducers, jsonState, composeWithDevTools(...enhancers))
    global.store = store
    return store
}
