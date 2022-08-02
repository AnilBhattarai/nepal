/*
 *
 * LeadManage reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  all: {
    data: [],
    page: 1,
    size: 10,
    totaldata: 0,
  },
  one: {
    name: '',
    inquiry: '',
    channel: '', // enum: ['Contact_Form', 'Facebook', 'Property_Inquiries', 'Via_Phone'] },
    email: '', //Contact_Form,Property_Inquiries
    phone_no: '', //via Phone, Contact Form, 'Property_Inquiries'
    profile_link: '', // Facebook
    date: '',
    is_active: false,
  },
  query: { find_channel: 'Contact_Form' },
  loading: false,
  errors: {},
  agency: [],
  agents: [],
  agent_loading: false,
  open: false,
};

/* eslint-disable default-case, no-param-reassign */
const leadManageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_ONE_VALUE:
        draft.one[action.payload.key] = action.payload.value;
        draft.errors[action.payload.errors] = ' ';
        break;
      case types.ADD_EDIT_FAILURE:
        draft.errors = action.payload.errors;
        break;
      case types.CLEAR_ERRORS:
        draft.errors = initialState.errors;
        break;
      case types.CLEAR_ONE:
        draft.one = initialState.one;
        break;
      case types.SET_QUERY_VALUE:
        draft.query[action.payload.key] = action.payload.value;
        break;
      case types.CLEAR_QUERY:
        draft.query = initialState.query;
        break;

      case types.LOAD_ALL_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ALL_SUCCESS:
        draft.all = action.payload;
        draft.loading = false;
        break;

      case types.LOAD_ONE_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ONE_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_ONE_SUCCESS:
        draft.one = action.payload.data;
        draft.loading = false;
        break;

      case types.DELETE_ONE_SUCCESS:
        draft.all = {
          ...draft.all,
          data: draft.all.data.filter(
            each => each._id != action.payload.data._id,
          ),
        };
        break;

      case types.LOAD_AGENY_SUCCESS:
        draft.agency = action.payload.data;
        break;

      case types.LOAD_AGENT_BY_AGENCY_SUCCESS:
        draft.agents = action.payload.data;
        break;

      case types.ASSIGN_AGENT_REQUEST:
        draft.agent_loading = true;
        break;
      case types.ASSIGN_AGENT_FAILURE:
        draft.agent_loading = false;
        break;
      case types.ASSIGN_AGENT_SUCCESS:
        draft.agent_loading = false;
        draft.open = false;
        break;

      case types.SET_OPEN:
        draft.open = action.payload;
        break;
    }
  });

export default leadManageReducer;
