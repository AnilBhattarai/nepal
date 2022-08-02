/*
 *
 * Dashboard actions
 *
 */

import * as types from './constants';

export const loadUserRequest = payload => ({
  type: types.LOAD_USER_REQUEST,
  payload,
});

export const loadUserSuccess = payload => ({
  type: types.LOAD_USER_SUCCESS,
  payload,
});

export const loadUserFailure = payload => ({
  type: types.LOAD_USER_FAILURE,
  payload,
});
export const loadErrorRequest = payload => ({
  type: types.LOAD_ERROR_REQUEST,
  payload,
});
export const loadErrorSuccess = payload => ({
  type: types.LOAD_ERROR_SUCCESS,
  payload,
});
export const loadErrorFailure = payload => ({
  type: types.LOAD_ERROR_FAILURE,
  payload,
});
export const loadInfoRequest = payload => ({
  type: types.LOAD_INFO_REQUEST,
  payload,
});
export const loadInfoSuccess = payload => ({
  type: types.LOAD_INFO_SUCCESS,
  payload,
});
export const loadInfoFailure = payload => ({
  type: types.LOAD_INFO_FAILURE,
  payload,
});
export const loadBlogRequest = payload => ({
  type: types.LOAD_BLOG_REQUEST,
  payload,
});
export const loadBlogSuccess = payload => ({
  type: types.LOAD_BLOG_SUCCESS,
  payload,
});
export const loadBlogFailure = payload => ({
  type: types.LOAD_BLOG_FAILURE,
  payload,
});

export const loadTotalPropertiesRequest = payload => ({
  type: types.LOAD_TOTAL_PROPERTIES_REQUEST,
  payload,
});
export const loadTotalPropertiesSuccess = payload => ({
  type: types.LOAD_TOTAL_PROPERTIES_SUCCESS,
  payload,
});
export const loadTotalPropertiesFailure = payload => ({
  type: types.LOAD_TOTAL_PROPERTIES_FAILURE,
  payload,
});

export const loadMonthPropertiesRequest = payload => ({
  type: types.LOAD_MONTH_PROPERTIES_REQUEST,
  payload,
});
export const loadMonthPropertiesSuccess = payload => ({
  type: types.LOAD_MONTH_PROPERTIES_SUCCESS,
  payload,
});
export const loadMonthPropertiesFailure = payload => ({
  type: types.LOAD_MONTH_PROPERTIES_FAILURE,
  payload,
});

export const loadCategoryPropertiesRequest = payload => ({
  type: types.LOAD_CATEGORY_PROPERTIES_REQUEST,
  payload,
});
export const loadCategoryPropertiesSuccess = payload => ({
  type: types.LOAD_CATEGORY_PROPERTIES_SUCCESS,
  payload,
});
export const loadCategoryPropertiesFailure = payload => ({
  type: types.LOAD_CATEGORY_PROPERTIES_FAILURE,
  payload,
});

export const loadPostsByAuhtorRequest = payload => ({
  type: types.LOAD_POSTS_BY_AUTHOR_REQUEST,
  payload,
});
export const loadPostsByAuhtorSuccess = payload => ({
  type: types.LOAD_POSTS_BY_AUTHOR_SUCCESS,
  payload,
});
export const loadPostsByAuhtorFailure = payload => ({
  type: types.LOAD_POSTS_BY_AUTHOR_FAILURE,
  payload,
});

export const loadUserSignUpCountRequest = payload => ({
  type: types.LOAD_USER_SIGNUP_COUNT_REQUEST,
  payload,
});
export const loadUserSignUpCountSuccess = payload => ({
  type: types.LOAD_USER_SIGNUP_COUNT_SUCCESS,
  payload,
});
export const loadUserSignUpCountFailure = payload => ({
  type: types.LOAD_USER_SIGNUP_COUNT_FAILURE,
  payload,
});

export const loadTopAgentRequest = payload => ({
  type: types.LOAD_TOP_AGENT_REQUEST,
  payload,
});
export const loadTopAgentSuccess = payload => ({
  type: types.LOAD_TOP_AGENT_SUCCESS,
  payload,
});
export const loadTopAgentFailure = payload => ({
  type: types.LOAD_TOP_AGENT_FAILURE,
  payload,
});

export const loadTopAreasRequest = payload => ({
  type: types.LOAD_TOP_AREAS_REQUEST,
  payload,
});
export const loadTopAreasSuccess = payload => ({
  type: types.LOAD_TOP_AREAS_SUCCESS,
  payload,
});
export const loadTopAreasFailure = payload => ({
  type: types.LOAD_TOP_AREAS_FAILURE,
  payload,
});

export const loadActiveSoldRequest = payload => ({
  type: types.LOAD_ACTIVE_SOLD_REQUEST,
  payload,
});
export const loadActiveSoldSuccess = payload => ({
  type: types.LOAD_ACTIVE_SOLD_SUCCESS,
  payload,
});
export const loadActiveSoldFailure = payload => ({
  type: types.LOAD_ACTIVE_SOLD_FAILURE,
  payload,
});

export const loadPropertiesByPriceRequest = payload => ({
  type: types.LOAD_PROPERTIES_BY_PRICE_REQUEST,
  payload,
});
export const loadPropertiesByPriceSuccess = payload => ({
  type: types.LOAD_PROPERTIES_BY_PRICE_SUCCESS,
  payload,
});
export const loadPropertiesByPriceFailure = payload => ({
  type: types.LOAD_PROPERTIES_BY_PRICE_FAILURE,
  payload,
});

export const loadPendingPropertiesRequest = payload => ({
  type: types.LOAD_PENDING_PROPERTIES_REQUEST,
  payload,
});
export const loadPendingPropertiesSuccess = payload => ({
  type: types.LOAD_PENDING_PROPERTIES_SUCCESS,
  payload,
});
export const loadPendingPropertiesFailure = payload => ({
  type: types.LOAD_PENDING_PROPERTIES_FAILURE,
  payload,
});
