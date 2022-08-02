/*
 *
 * ProjectSection actions
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

export const setOneValue = payload => ({
  type: types.SET_ONE_VALUE,
  payload,
});
export const clearOne = () => ({
  type: types.CLEAR_ONE,
});
export const clearErrors = () => ({
  type: types.CLEAR_ERRORS,
});
export const setPropertiesValue = payload => ({
  type: types.SET_PROPERTIES_VALUE,
  payload,
});
export const loadPropertyRequest = payload => ({
  type: types.LOAD_PROPERTY_REQUEST,
  payload,
});
export const loadPropertySuccess = payload => ({
  type: types.LOAD_PROPERTY_SUCCESS,
  payload,
});
export const loadPropertyFailure = payload => ({
  type: types.LOAD_PROPERTY_FAILURE,
  payload,
});

export const setStartDate = payload => ({
  type: types.SET_START_DATE,
  payload,
});
export const setEndDate = payload => ({
  type: types.SET_END_DATE,
  payload,
});

export const loadProjectRequest = payload => ({
  type: types.LOAD_PROJECT_REQUEST,
  payload,
});
export const loadProjectSuccess = payload => ({
  type: types.LOAD_PROJECT_SUCCESS,
  payload,
});
export const loadProjectFailure = payload => ({
  type: types.LOAD_PROJECT_FAILURE,
  payload,
});
