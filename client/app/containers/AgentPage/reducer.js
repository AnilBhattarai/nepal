/*
 *
 * AgentPage reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  all: {
    data: [],
    page: 1,
    size: 8,
    totaldata: 0,
  },
  agent: {},
  agents: [],
  loading: false,
  query: {
    sort: '1',
  },
  enums: {},
  has_data: false,
  form: {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    message: '',
    agency_id: '',
    contact_purpose: 'Selling_my_property',
  },
  errors: {},
  form_loading: false,
  propertyCount: [],
};

/* eslint-disable default-case, no-param-reassign */
const agentPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_ALL_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ALL_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_ALL_SUCCESS:
        draft.all = action.payload;
        draft.loading = false;
        break;
      case types.LOAD_AGENT_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_AGENT_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_AGENT_SUCCESS:
        draft.agent = action.payload.data.agencies;
        draft.agents = action.payload.data.agents;
        draft.form.agency_id = action.payload.data.agencies._id;
        draft.propertyCount = action.payload.data.propertyCount;

        draft.loading = false;
        break;
      case types.SET_QUERY_VALUE:
        draft.query[action.payload.key] = action.payload.value;
        break;

      case types.LOAD_ENUMS_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ENUMS_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_ENUMS_SUCCESS:
        draft.enums = action.payload.data;
        draft.loading = false;
        break;
      case types.LOAD_DATA_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_DATA_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_DATA_SUCCESS:
        if (action.payload.data.length > 0) {
          draft.has_data = true;
        } else {
          draft.has_data = false;
        }
        draft.loading = false;
        break;

      case types.SET_FORM_VALUE:
        draft.form[action.payload.key] = action.payload.value;
        break;

      case types.CONTACT_AGENCY_REQUEST:
        draft.form_loading = true;
        break;
      case types.CONTACT_AGENCY_FAILURE:
        draft.form_loading = false;
        draft.errors = action.payload.errors;

        break;
      case types.CONTACT_AGENCY_SUCCESS:
        draft.form = initialState.form;
        draft.errors = initialState.errors;
        draft.form_loading = false;
        break;
    }
  });

export default agentPageReducer;
