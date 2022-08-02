/*
 *
 * LocationTreeView actions
 *
 */

import * as types from './constants';

export const loadLocationRequest = payload => ({
  type: types.LOAD_LOCATION_REQUEST,
  payload,
});
export const loadLocationSuccess = payload => ({
  type: types.LOAD_LOCATION_SUCCESS,
  payload,
});
export const loadLocationFailure = payload => ({
  type: types.LOAD_LOCATION_FAILURE,
  payload,
});

export const setActiveRequest = payload => ({
  type: types.SET_ACTIVE_REQUEST,
  payload,
});
export const setActiveSuccess = payload => ({
  type: types.SET_ACTIVE_SUCCESS,
  payload,
});
export const setActiveFailure = payload => ({
  type: types.SET_ACTIVE_FAILURE,
  payload,
});
