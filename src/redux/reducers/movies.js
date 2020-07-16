/**
 * action reducer for the posts
 */
import { APPLICATION_ROUTES } from '../../constants.js';
import { TRANSIENT_TOGGLE, ERROR, SUCCESS } from '../actions/actionTypes';

const defaultState = {
	data: undefined,
	page: 1,
	limit: 30,
	length: 0,
	success: undefined,
	error: undefined,
	editing: undefined,
};

export default (state = defaultState, {
	type,
	data = [],
	page = 1,
	limit = 30,
	success,
	error,
	toggleId,
}) => {
	switch (type) {
		case APPLICATION_ROUTES.LIST_MOVIES:
			return Object.assign({}, state, {
				data,
				page,
				limit,
				length: data.length,
			});
		case APPLICATION_ROUTES.SEARCH_MOVIES:
			return Object.assign({}, state, {
				data,
				page,
				limit,
				length: data.length,
			});
		case ERROR:
			return Object.assign({}, state, { error });
		case SUCCESS:
			return Object.assign({}, state, { success });

		default:
			return state;
	}
};
