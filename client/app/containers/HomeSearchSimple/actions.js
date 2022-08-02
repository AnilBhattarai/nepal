/*
 *
 * HomeSearch actions
 *
 */

import * as types from './constants';

export const loadEnumRequest = payload => ({
  type: types.LOAD_ENUM_REQUEST,
  payload,
});
export const loadEnumSuccess = payload => ({
  type: types.LOAD_ENUM_SUCCESS,
  payload,
});
export const loadEnumFailure = payload => ({
  type: types.LOAD_ENUM_FAILURE,
  payload,
});
export const loadFilterRequest = payload => ({
  type: types.LOAD_FILTER_REQUEST,
  payload,
});
export const loadFilterSuccess = payload => ({
  type: types.LOAD_FILTER_SUCCESS,
  payload,
});
export const loadFilterFailure = payload => ({
  type: types.LOAD_FILTER_FAILURE,
  payload,
});
export const setFilterValue = payload => ({
  type: types.SET_FILTER_VALUE,
  payload,
});
export const clearFilterValues = payload => ({
  type: types.CLEAR_FILTER_VALUES,
  payload,
});
export const setQueryValue = payload => ({
  type: types.SET_QUERY_VALUE,
  payload,
});
export const clearQuery = () => ({
  type: types.CLEAR_QUERY,
});
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
