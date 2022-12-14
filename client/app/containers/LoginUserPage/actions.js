/*
 *
 * LoginUserPage actions
 *
 */

import * as types from './constants';

export const setStoreValue = payload => ({
  type: types.SET_STORE_VALUE,
  payload,
});
export const clearStore = payload => ({ type: types.CLEAR_STORE, payload });

export const loginRequest = payload => ({ type: types.LOGIN_REQUEST, payload });
export const loginSuccess = payload => ({ type: types.LOGIN_SUCCESS, payload });
export const loginFailure = payload => ({ type: types.LOGIN_FAILURE, payload });

export const loginWithFbRequest = payload => ({
  type: types.LOGIN_WITH_FB_REQUEST,
  payload,
});
export const loginWithFbSuccess = payload => ({
  type: types.LOGIN_WITH_FB_SUCCESS,
  payload,
});
export const loginWithFbFailure = payload => ({
  type: types.LOGIN_WITH_FB_FAILURE,
  payload,
});

export const loginWithGoogleRequest = payload => ({
  type: types.LOGIN_WITH_GOOGLE_REQUEST,
  payload,
});
export const loginWithGoogleSuccess = payload => ({
  type: types.LOGIN_WITH_GOOGLE_SUCCESS,
  payload,
});
export const loginWithGoogleFailure = payload => ({
  type: types.LOGIN_WITH_GOOGLE_FAILURE,
  payload,
});
