import * as types from './constants';

export const setQueryValue = payload => ({
  type: types.SET_QUERY_VALUE,
  payload,
});
export const setQueryObj = payload => ({
  type: types.SET_QUERY_OBJ,
  payload,
});
export const clearQuery = payload => ({
  type: types.CLEAR_QUERY,
  payload,
});

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

export const clearErrors = () => ({
  type: types.CLEAR_ERRORS,
});

export const builderDataRequest = payload => ({
  type: types.BUILDER_DATA_REQUEST,
  payload,
});
export const builderDataSuccess = payload => ({
  type: types.BUILDER_DATA_SUCCESS,
  payload,
});
export const builderDataFailure = payload => ({
  type: types.BUILDER_DATA_FAILURE,
  payload,
});

export const applyBuilderRequest = payload => ({
  type: types.APPLY_BUILDER_REQUEST,
  payload,
});
export const applyBuilderSuccess = payload => ({
  type: types.APPLY_BUILDER_SUCCESS,
  payload,
});
export const applyBuilderFailure = payload => ({
  type: types.APPLY_BUILDER_FAILURE,
  payload,
});

export const setBuilderValue = payload => ({
  type: types.SET_BUILDER_VALUE,
  payload,
});
