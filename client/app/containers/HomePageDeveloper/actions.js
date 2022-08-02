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
