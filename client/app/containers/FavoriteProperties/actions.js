/*
 *
 * FavoriteProperties actions
 *
 */

import * as types from './constants';

export const loadFavoriteRequest = payload => ({
  type: types.LOAD_FAVORITE_REQUEST,
  payload,
});
export const loadFavoriteSuccess = payload => ({
  type: types.LOAD_FAVORITE_SUCCESS,
  payload,
});
export const loadFavoriteFailure = payload => ({
  type: types.LOAD_FAVORITE_FAILURE,
  payload,
});

export const loadMoreRequest = payload => ({
  type: types.LOAD_MORE_REQUEST,
  payload,
});
export const loadMoreSuccess = payload => ({
  type: types.LOAD_MORE_SUCCESS,
  payload,
});
export const loadMoreFailure = payload => ({
  type: types.LOAD_MORE_FAILURE,
  payload,
});
