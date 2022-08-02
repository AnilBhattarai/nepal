/*
 *
 * HomeLoanForm actions
 *
 */

import * as types from './constants';

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

export const setOneValue = payload => ({
  type: types.SET_ONE_VALUE,
  payload,
});
export const clearOne = payload => ({
  type: types.CLEAR_ONE,
  payload,
});
export const clearErrors = payload => ({
  type: types.CLEAR_ERRORS,
  payload,
});
export const loadCityRequest = payload => ({
  type: types.LOAD_CITY_REQUEST,
  payload,
});
export const loadCitySuccess = payload => ({
  type: types.LOAD_CITY_SUCCESS,
  payload,
});
export const loadCityFailure = payload => ({
  type: types.LOAD_CITY_FAILURE,
  payload,
});
export const setBankName = payload => ({
  type: types.SET_BANK_NAME,
  payload,
});
export const loadBankRequest = payload => ({
  type: types.LOAD_BANK_REQUEST,
  payload,
});
export const loadBankSuccess = payload => ({
  type: types.LOAD_BANK_SUCCESS,
  payload,
});
export const loadBankFailure = payload => ({
  type: types.LOAD_BANK_FAILURE,
  payload,
});

export const loadMoreBankRequest = payload => ({
  type: types.LOAD_MORE_BANK_REQUEST,
  payload,
});
export const loadMoreBankSuccess = payload => ({
  type: types.LOAD_MORE_BANK_SUCCESS,
  payload,
});
export const loadMoreBankFailure = payload => ({
  type: types.LOAD_MORE_BANK_FAILURE,
  payload,
});
