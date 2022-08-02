/*
 *
 * Career actions
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

export const addEditRequest = payload => ({
  type: types.ADD_EDIT_REQUEST,
  payload,
});
export const addEditSuccess = payload => ({
  type: types.ADD_EDIT_SUCCESS,
  payload,
});
export const addEditFailure = payload => ({
  type: types.ADD_EDIT_FAILURE,
  payload,
});

export const deleteOneRequest = payload => ({
  type: types.DELETE_ONE_REQUEST,
  payload,
});
export const deleteOneSuccess = payload => ({
  type: types.DELETE_ONE_SUCCESS,
  payload,
});
export const deleteOneFailure = payload => ({
  type: types.DELETE_ONE_FAILURE,
  payload,
});

export const loadCategoryRequest = payload => ({
  type: types.LOAD_CATEGORY_REQUEST,
  payload,
});
export const loadCategorySuccess = payload => ({
  type: types.LOAD_CATEGORY_SUCCESS,
  payload,
});
export const loadCategoryFailure = payload => ({
  type: types.LOAD_CATEGORY_FAILURE,
  payload,
});

export const setOneValue = payload => ({
  type: types.SET_ONE_VALUE,
  payload,
});
export const clearOne = () => ({
  type: types.CLEAR_ONE,
});

export const setQueryValue = payload => ({
  type: types.SET_QUERY_VALUE,
  payload,
});
export const clearQuery = () => ({
  type: types.CLEAR_QUERY,
});
export const clearErrors = () => ({
  type: types.CLEAR_ERRORS,
});

export const addMediaRequest = payload => ({
  type: types.ADD_MEDIA_REQUEST,
  payload,
});
export const addMediaSuccess = payload => ({
  type: types.ADD_MEDIA_SUCCESS,
  payload,
});
export const addMediaFailure = payload => ({
  type: types.ADD_MEDIA_FAILURE,
  payload,
});

export const deleteMediaRequest = payload => ({
  type: types.DELETE_MEDIA_REQUEST,
  payload,
});
export const deleteMediaSuccess = payload => ({
  type: types.DELETE_MEDIA_SUCCESS,
  payload,
});
export const deleteMediaFailure = payload => ({
  type: types.DELETE_MEDIA_FAILURE,
  payload,
});

export const applyRequest = payload => ({
  type: types.APPLY_REQUEST,
  payload,
});
export const applySuccess = payload => ({
  type: types.APPLY_SUCCESS,
  payload,
});
export const applyFailure = payload => ({
  type: types.APPLY_FAILURE,
  payload,
});
