/*
 *
 * TrendingProperty actions
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
