/*
 *
 * ListView actions
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
export const loadAgencyRequest = payload => ({
  type: types.LOAD_AGENCY_REQUEST,
  payload,
});
export const loadAgencySuccess = payload => ({
  type: types.LOAD_AGENCY_SUCCESS,
  payload,
});
export const loadAgencyFailure = payload => ({
  type: types.LOAD_AGENCY_FAILURE,
  payload,
});
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
export const setOfferValue = payload => ({
  type: types.SET_OFFER_VALUE,
  payload,
});
export const clearOne = payload => ({
  type: types.CLEAR_ONE,
  payload,
});
export const clearOffer = payload => ({
  type: types.CLEAR_OFFER,
  payload,
});
export const setOfferForm = payload => ({
  type: types.SET_OFFER_FORM,
  payload,
});
export const setFavoriteValue = payload => ({
  type: types.SET_FAVORITE_VALUE,
  payload,
});
export const setFavoriteSuccess = payload => ({
  type: types.SET_FAVORITE_SUCCESS,
  payload,
});
export const setFavoriteFailure = payload => ({
  type: types.SET_FAVORITE_FAILURE,
  payload,
});
export const clearDevAndAgent = payload => ({
  type: types.CLEAR_DEV_AGENT,
  payload,
});
export const clearDevAndAgentImmediate = payload => ({
  type: types.CLEAR_DEV_AGENT_IMMEDIATE,
  payload,
});

export const makeOfferRequest = payload => ({
  type: types.MAKE_OFFER_REQUEST,
  payload,
});
export const makeOfferSuccess = payload => ({
  type: types.MAKE_OFFER_SUCCESS,
  payload,
});
export const makeOfferFailure = payload => ({
  type: types.MAKE_OFFER_FAILURE,
  payload,
});
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

export const setFeedbackValue = payload => ({
  type: types.SET_FEEDBACK_VALUE,
  payload,
});

export const postFeedbackRequest = payload => ({
  type: types.POST_FEEDBACK_REQUEST,
  payload,
});
export const postFeedbackSuccess = payload => ({
  type: types.POST_FEEDBACK_SUCCESS,
  payload,
});
export const postFeedbackFailure = payload => ({
  type: types.POST_FEEDBACK_FAILURE,
  payload,
});

export const loadComplainTypeRequest = payload => ({
  type: types.LOAD_COMPLAIN_TYPE_REQUEST,
  payload,
});
export const loadComplainTypeSuccess = payload => ({
  type: types.LOAD_COMPLAIN_TYPE_SUCCESS,
  payload,
});
export const loadComplainTypeFailure = payload => ({
  type: types.LOAD_COMPLAIN_TYPE_FAILURE,
  payload,
});

export const setOptionsValue = payload => ({
  type: types.SET_OPTIONS_VALUE,
  payload,
});
export const setFeedbackForm = payload => ({
  type: types.SET_FEEDBACK_FORM,
  payload,
});

export const clearFeedback = payload => ({
  type: types.CLEAR_FEEDBACK_VALUE,
  payload,
});

export const setFormOpen = payload => ({
  type: types.SET_FORM_OPEN,
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

export const setCountRequest = payload => ({
  type: types.SET_COUNT_REQUEST,
  payload,
});
export const setCountSuccess = payload => ({
  type: types.SET_COUNT_SUCCESS,
  payload,
});
export const setCountFailure = payload => ({
  type: types.SET_COUNT_FAILURE,
  payload,
});

export const saveSearchRequest = payload => ({
  type: types.SAVE_SEARCH_REQUEST,
  payload,
});
export const saveSearchSuccess = payload => ({
  type: types.SAVE_SEARCH_SUCCESS,
  payload,
});
export const saveSearchFailure = payload => ({
  type: types.SAVE_SEARCH_FAILURE,
  payload,
});
