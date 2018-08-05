import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import trivialReduxMiddleware from 'trivial-redux-middleware'
import reduxThunk from "redux-thunk";
import unwrapMiddleware from "./middlewares/unwrapMiddleware";
import urlMiddleware from "./middlewares/urlMiddleware";
import api from "./api";
import moduleReducers from './modules'
import {ADMIN_APP, USER_APP} from './modules/apps'

const middlewares = [reduxThunk, urlMiddleware, trivialReduxMiddleware, unwrapMiddleware];

const enhancers = [applyMiddleware(...middlewares)];

const reducers = combineReducers(Object.assign({}, api.reducers, moduleReducers));

export default function setUpStore(app=USER_APP) {
  const appState = app == ADMIN_APP ? "evysAdminMainAppState" : "evysMainAppState"
  const state = localStorage.getItem(appState);
  return state ? getStatedStorage(state) : getDefaultStorage();
}

function getDefaultStorage() {
  const store = createStore(reducers, {}, compose(...enhancers));
  global.store = store;
  return store;
}

function getStatedStorage(state) {
  const jsonState = JSON.parse(state)
  delete jsonState.asset_manager
  const store = createStore(reducers, jsonState, compose(...enhancers));
  global.store = store;
  return store;
}
