/**
 * This file defines application level constants
 */
import { SERVER } from './statics';

export const SERVER_BASE_URL = SERVER;
export const APPLICATION_ROUTES = {
	// URLS
    USER_LOGIN: `${SERVER_BASE_URL}users/login`,
    USER_REGISTER: `${SERVER_BASE_URL}users/register`,
    LIST_MOVIES: `${SERVER_BASE_URL}movies/list`,
    SEARCH_MOVIES: `${SERVER_BASE_URL}movies/search`,
};

export const navigationIndexer = {
	dashboard: 1,
};
