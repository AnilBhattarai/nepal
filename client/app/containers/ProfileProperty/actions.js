/*
 *
 * ProfileProperty actions
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
export const clearOne = () => ({
  type: types.CLEAR_ONE,
});
export const setQueryValue = payload => ({
  type: types.SET_QUERY_VALUE,
  payload,
});
export const loadOfferRequest = payload => ({
  type: types.LOAD_OFFER_REQUEST,
  payload,
});
export const loadOfferSuccess = payload => ({
  type: types.LOAD_OFFER_SUCCESS,
  payload,
});
export const loadOfferFailure = payload => ({
  type: types.LOAD_OFFER_FAILURE,
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

export const setFilterValue = payload => ({
  type: types.SET_FILTER_VALUE,
  payload,
});

export const loadAgentsRequest = payload => ({
  type: types.LOAD_AGENTS_REQUEST,
  payload,
});
export const loadAgentsSuccess = payload => ({
  type: types.LOAD_AGENTS_SUCCESS,
  payload,
});
export const loadAgentsFailure = payload => ({
  type: types.LOAD_AGENTS_FAILURE,
  payload,
});

export const loadPropertyCountRequest = payload => ({
  type: types.LOAD_PROPERTY_COUNT_REQUEST,
  payload,
});
export const loadPropertyCountSuccess = payload => ({
  type: types.LOAD_PROPERTY_COUNT_SUCCESS,
  payload,
});
export const loadPropertyCountFailure = payload => ({
  type: types.LOAD_PROPERTY_COUNT_FAILURE,
  payload,
});
