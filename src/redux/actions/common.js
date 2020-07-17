/**
 * @description
 * experimental common function to  handle the commmonly
 * used redux action that handles the reducing on the
 * basis of the endpoints.
 */
import axios from 'axios';
import {
	fetchAction,
	error,
} from '.';
import { TRANSIENT_TOGGLE, ERROR, SUCCESS } from './actionTypes';

const headers = {
	'Content-Type': 'application/json',
	Authorization: localStorage.adminAccessToken,
};

/**
 * trigger fetch entity function
 * @param {*} param0
 */
export const fetchEntity = ({
	payload,
	page = 1,
	limit = 30,
	endpoint,
}) => (dispatch) => {
	if (!endpoint) {
		return dispatch(error({ error: 'Required endpoint is missing.' }));
	}
	dispatch(fetchAction({ fetching: true }));
	const body = Object.assign({}, payload, { page, limit });

	axios.post(endpoint, body, { headers })
		.then((response) => {
			const {
				data: {
					code,
					data,
				},
			} = response;
			if (code === 100) {
				// dispatch the success along with the paginated data
				dispatch({
					type: endpoint,
					data,
					page,
					limit,
				});
			}
			dispatch(fetchAction({ fetching: false }));
		}).catch((err) => {
			console.error(err);
			dispatch(fetchAction({ fetching: false }));
			dispatch(error({ error: 'Error while fetching entity list.' }));
		});
};

/**
 * trigger add entity functionality. This action function is generic to add
 * any new entity into the system.
 * @param {*} param0
 * @param {Array<Function>} customDispatchers contains an array of functions to
 * dispatch once the service has been executed successfully.
 */
export const genericCreateEntity = ({
	page = 1,
	limit = 30,
	payload,
	picture,
	multipart = false,
	endpoint,
	listingEndpoint,
	customDispatchers = [],
}) => (dispatch) => {
	if (!(endpoint && listingEndpoint)) {
		return dispatch(error({ error: 'Missing required property endpoint and listingEndpoint.' }));
	}
	dispatch(fetchAction({ fetching: true }));
	let requestBody = payload;
	const requestHeaders = Object.assign({}, headers);
	if (multipart) {
		const formData = new FormData();
		if (picture) {
			formData.append('image', picture);
		}
		// console.log(payload);
		formData.append('data', JSON.stringify(payload));
		requestHeaders['Content-Type'] = 'multipart/form-data';
		requestBody = formData;
	}
	axios.post(endpoint, requestBody, { headers: requestHeaders })
		.then((response) => {
			const { data: { code, message } } = response;
			if (code === 100) {
				// created
				// trigger fetch listing
				dispatch(fetchEntity({
					page,
					limit,
					endpoint: listingEndpoint,
				}));
				customDispatchers.map(dispatchFunction => dispatch(dispatchFunction()));
				dispatch({ type: SUCCESS, success: 'Success!' });
			} else {
				// handle errors
				dispatch(error({ error: message }));
			}
			return dispatch(fetchAction({ fetching: false }));
		}).catch((err) => {
			console.error(err);
			dispatch(error({ error: 'Error while creating entity' }));
			return dispatch(fetchAction({ fetching: false }));
		});
};



export const nullifyError = () => (dispatch) => {
	dispatch({ type: ERROR, error: undefined });
};

export const nullifySuccess = () => (dispatch) => {
	dispatch({ type: SUCCESS, success: undefined });
};
