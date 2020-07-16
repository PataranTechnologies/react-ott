/**
 * dispatch the navgation change triggers
 */
import { SWITCH_NAVIGATION } from './actionTypes';

export default ({ active = 1 }) => ({ type: SWITCH_NAVIGATION, active });
