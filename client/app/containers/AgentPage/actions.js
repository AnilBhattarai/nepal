/*
 *
 * AgentPage actions
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
export const loadAgentRequest = payload => ({
  type: types.LOAD_AGENT_REQUEST,
  payload,
});
export const loadAgentSuccess = payload => ({
  type: types.LOAD_AGENT_SUCCESS,
  payload,
});
export const loadAgentFailure = payload => ({
  type: types.LOAD_AGENT_FAILURE,
  payload,
});
export const setQueryValue = payload => ({
  type: types.SET_QUERY_VALUE,
  payload,
});
export const loadEnumsRequest = payload => ({
  type: types.LOAD_ENUMS_REQUEST,
  payload,
});
export const loadEnumsSuccess = payload => ({
  type: types.LOAD_ENUMS_SUCCESS,
  payload,
});
export const loadEnumsFailure = payload => ({
  type: types.LOAD_ENUMS_FAILURE,
  payload,
});
export const loadDataRequest = payload => ({
  type: types.LOAD_DATA_REQUEST,
  payload,
});
export const loadDataSuccess = payload => ({
  type: types.LOAD_DATA_SUCCESS,
  payload,
});
export const loadDataFailure = payload => ({
  type: types.LOAD_DATA_FAILURE,
  payload,
});

export const contactAgencyRequest = payload => ({
  type: types.CONTACT_AGENCY_REQUEST,
  payload,
});
export const contactAgencySuccess = payload => ({
  type: types.CONTACT_AGENCY_SUCCESS,
  payload,
});
export const contactAgencyFailure = payload => ({
  type: types.CONTACT_AGENCY_FAILURE,
  payload,
});

export const setFormValue = payload => ({
  type: types.SET_FORM_VALUE,
  payload,
});
