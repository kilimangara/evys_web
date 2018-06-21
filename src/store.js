import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import fetchMiddleware, { promiseMiddleware } from "fetch-middleware-for-redux";
import reduxThunk from "redux-thunk";
import unwrapMiddleware from "./middlewares/unwrapMiddleware";
import urlMiddleware from "./middlewares/urlMiddleware";
import api from "./api";
import moduleReducers from './modules'

const middlewares = [reduxThunk, urlMiddleware, fetchMiddleware, promiseMiddleware, unwrapMiddleware];

const enhancers = [applyMiddleware(...middlewares)];

const reducers = combineReducers(Object.assign({}, api.reducers, moduleReducers));

export default function setUpStore() {
  const state = localStorage.getItem("storeState");
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
