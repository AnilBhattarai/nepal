/*
 *
 * DevelopersPage actions
 *
 */

import * as types from './constants';

export const loadDeveloperRequest = payload => ({
  type: types.LOAD_DEVELOPER_REQUEST,
  payload,
});
export const loadDeveloperSuccess = payload => ({
  type: types.LOAD_DEVELOPER_SUCCESS,
  payload,
});
export const loadDeveloperFailure = payload => ({
  type: types.LOAD_DEVELOPER_FAILURE,
  payload,
});

export const loadDeveloperDetailRequest = payload => ({
  type: types.LOAD_DEVELOPER_DETAIL_REQUEST,
  payload,
});
export const loadDeveloperDetailSuccess = payload => ({
  type: types.LOAD_DEVELOPER_DETAIL_SUCCESS,
  payload,
});
export const loadDeveloperDetailFailure = payload => ({
  type: types.LOAD_DEVELOPER_DETAIL_FAILURE,
  payload,
});

export const contactDeveloperRequest = payload => ({
  type: types.CONTACT_DEVELOPER_REQUEST,
  payload,
});
export const contactDeveloperSuccess = payload => ({
  type: types.CONTACT_DEVELOPER_SUCCESS,
  payload,
});
export const contactDeveloperFailure = payload => ({
  type: types.CONTACT_DEVELOPER_FAILURE,
  payload,
});

export const setFormValue = payload => ({
  type: types.SET_FORM_VALUE,
  payload,
});
