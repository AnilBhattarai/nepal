/*
 *
 * User actions
 *
 */

import * as types from './constants';

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

export const loadAllRolesRequest = payload => ({
  type: types.LOAD_ALL_ROLES_REQUEST,
  payload,
});
export const loadAllRolesSuccess = payload => ({
  type: types.LOAD_ALL_ROLES_SUCCESS,
  payload,
});
export const loadAllRolesFailure = payload => ({
  type: types.LOAD_ALL_ROLES_FAILURE,
  payload,
});

export const updatePasswordRequest = payload => ({
  type: types.UPDATE_PASSWORD_REQUEST,
  payload,
});
export const updatePasswordSuccess = payload => ({
  type: types.UPDATE_PASSWORD_SUCCESS,
  payload,
});
export const updatePasswordFailure = payload => ({
  type: types.UPDATE_PASSWORD_FAILURE,
  payload,
});
export const clearErrors = () => ({
  type: types.CLEAR_ERRORS,
});

export const agentDataRequest = payload => ({
  type: types.AGENT_DATA_REQUEST,
  payload,
});
export const agentDataSuccess = payload => ({
  type: types.AGENT_DATA_SUCCESS,
  payload,
});
export const agentDataFailure = payload => ({
  type: types.AGENT_DATA_FAILURE,
  payload,
});
export const authorDataRequest = payload => ({
  type: types.AUTHOR_DATA_REQUEST,
  payload,
});
export const authorDataSuccess = payload => ({
  type: types.AUTHOR_DATA_SUCCESS,
  payload,
});
export const authorDataFailure = payload => ({
  type: types.AUTHOR_DATA_FAILURE,
  payload,
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

export const applyAgentRequest = payload => ({
  type: types.APPLY_AGENT_REQUEST,
  payload,
});
export const applyAgentSuccess = payload => ({
  type: types.APPLY_AGENT_SUCCESS,
  payload,
});
export const applyAgentFailure = payload => ({
  type: types.APPLY_AGENT_FAILURE,
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

export const applyAuthorRequest = payload => ({
  type: types.APPLY_AUTHOR_REQUEST,
  payload,
});
export const applyAuthorSuccess = payload => ({
  type: types.APPLY_AUTHOR_SUCCESS,
  payload,
});
export const applyAuthorFailure = payload => ({
  type: types.APPLY_AUTHOR_FAILURE,
  payload,
});

export const setAgentValue = payload => ({
  type: types.SET_AGENT_VALUE,
  payload,
});

export const setBuilderValue = payload => ({
  type: types.SET_BUILDER_VALUE,
  payload,
});

export const setAuthorValue = payload => ({
  type: types.SET_AUTHOR_VALUE,
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
