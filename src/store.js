import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import trivialReduxMiddleware from 'trivial-redux-middleware'
import reduxThunk from "redux-thunk";
import unwrapMiddleware from "./middlewares/unwrapMiddleware";
import urlMiddleware from "./middlewares/urlMiddleware";
import {studentAPI, adminAPI} from "./api";
import moduleReducers from './modules'
import {ADMIN_APP, USER_APP} from './modules/apps'

const middlewares = [reduxThunk, urlMiddleware, trivialReduxMiddleware, unwrapMiddleware];

const enhancers = [applyMiddleware(...middlewares)];

const adminReducers = combineReducers(Object.assign({}, adminAPI.reducers, moduleReducers));

const studentReducers = combineReducers(Object.assign({}, studentAPI.reducers, moduleReducers));

export default function setUpStore(app=USER_APP) {
  const appState = app == ADMIN_APP ? "evysAdminMainAppState" : "evysMainAppState"
  const state = localStorage.getItem(appState);
  return state ? getStatedStorage(state, app) : getDefaultStorage(app);
}

function getDefaultStorage(app) {
  const reducers = app == ADMIN_APP ? adminReducers : studentReducers
  const store = createStore(reducers, {}, compose(...enhancers));
  global.store = store;
  return store;
}

function getStatedStorage(state, app) {
  const reducers = app == ADMIN_APP ? adminReducers : studentReducers
  const jsonState = JSON.parse(state)
  const store = createStore(reducers, jsonState, compose(...enhancers));
  global.store = store;
  return store;
}
