import * as types from './constants';

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

export const logoutRequest = payload => ({
  type: types.LOGOUT_REQUEST,
  payload,
});
export const logoutSuccess = payload => ({
  type: types.LOGOUT_SUCCESS,
  payload,
});
export const logoutFailure = payload => ({
  type: types.LOGOUT_FAILURE,
  payload,
});