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

export const setAgentValue = payload => ({
  type: types.SET_AGENT_VALUE,
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
