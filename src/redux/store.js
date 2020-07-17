/**
 * The application store
 */

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import * as reducers from './reducers';

// enhances combines all the middlewares.
const enhancer = process.env.NODE_ENV === 'production' ? applyMiddleware(thunk) : applyMiddleware(thunk, createLogger());

export default (initialState = {}) => createStore(combineReducers({
	fetching: reducers.fetchReducer,
	login: reducers.loginReducer,
	navigation: reducers.navigationReducer,
	error: reducers.errorReducer,
	movies: reducers.moviesReducer,
}), initialState, enhancer);
