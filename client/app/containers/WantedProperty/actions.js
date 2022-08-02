/*
 *
 * WantedProperty actions
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
export const loadListingRequest = payload => ({
  type: types.LOAD_LISTING_REQUEST,
  payload,
});
export const loadListingSuccess = payload => ({
  type: types.LOAD_LISTING_SUCCESS,
  payload,
});
export const loadListingFailure = payload => ({
  type: types.LOAD_LISTING_FAILURE,
  payload,
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

export const makeFormRequest = payload => ({
  type: types.MAKE_FORM_REQUEST,
  payload,
});
export const makeFormSuccess = payload => ({
  type: types.MAKE_FORM_SUCCESS,
  payload,
});
export const makeFormFailure = payload => ({
  type: types.MAKE_FORM_FAILURE,
  payload,
});

export const setFormValue = payload => ({
  type: types.SET_FORM_VALUE,
  payload,
});
export const setFormOpen = payload => ({
  type: types.SET_FORM_OPEN,
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
