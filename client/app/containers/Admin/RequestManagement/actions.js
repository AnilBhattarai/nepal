/*
 *
 * RequestManagement actions
 *
 */

import * as types from './constants';

export const loadAllRequest = payload => ({
  type: types.LOAD_ALL_REQUEST,
  payload,
});
export const loadAllSuccess = payload => ({
  type: types.LOAD_ALL_SUCCESS,
  payload,
});
export const loadAllFailure = payload => ({
  type: types.LOAD_ALL_FAILURE,
  payload,
});

export const loadOneRequest = payload => ({
  type: types.LOAD_ONE_REQUEST,
  payload,
});
export const loadOneSuccess = payload => ({
  type: types.LOAD_ONE_SUCCESS,
  payload,
});
export const loadOneFailure = payload => ({
  type: types.LOAD_ONE_FAILURE,
  payload,
});
export const deleteOneRequest = payload => ({
  type: types.DELETE_ONE_REQUEST,
  payload,
});
export const deleteOneSuccess = payload => ({
  type: types.DELETE_ONE_SUCCESS,
  payload,
});
export const deleteOneFailure = payload => ({
  type: types.DELETE_ONE_FAILURE,
  payload,
});

export const setOneValue = payload => ({
  type: types.SET_ONE_VALUE,
  payload,
});
export const clearOne = () => ({
  type: types.CLEAR_ONE,
});

export const addEditRequest = payload => ({
  type: types.ADD_EDIT_REQUEST,
  payload,
});
export const addEditSuccess = payload => ({
  type: types.ADD_EDIT_SUCCESS,
  payload,
});
export const addEditFailure = payload => ({
  type: types.ADD_EDIT_FAILURE,
  payload,
});

export const setQueryValue = payload => ({
  type: types.SET_QUERY_VALUE,
  payload,
});
export const clearQuery = () => ({
  type: types.CLEAR_QUERY,
});
export const clearErrors = () => ({
  type: types.CLEAR_ERRORS,
});
export const loadPurposeRequest = payload => ({
  type: types.LOAD_PURPOSE_REQUEST,
  payload,
});
export const loadPurposeSuccess = payload => ({
  type: types.LOAD_PURPOSE_SUCCESS,
  payload,
});
export const loadPurposeFailure = payload => ({
  type: types.LOAD_PURPOSE_FAILURE,
  payload,
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

export const loadPriceRequest = payload => ({
  type: types.LOAD_PRICE_REQUEST,
  payload,
});
export const loadPriceSuccess = payload => ({
  type: types.LOAD_PRICE_SUCCESS,
  payload,
});
export const loadPriceFailure = payload => ({
  type: types.LOAD_PRICE_FAILURE,
  payload,
});
