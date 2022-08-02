import produce from 'immer';
import * as types from './constants';
import defaultImage from '../../../assets/img/logo.png';

export const initialState = {
  all: {
    data: [],
    page: 1,
    size: 10,
    totaldata: 0,
  },
  one: {
    title: '',
    slug_url: '',
    email: '',
    phone: '',
    address: '',
    mobile: '',
    description: '',
    fb_link: '',
    premium: false,
  },
  query: { size: 10, page: 1 },
  loading: false,
  errors: {
    title: '',
    slug_url: '',
    email: '',
    website: '',
    address: '',
    phone: '',
    mobile: '',
    description: '',
    is_active: '',
    is_approved: '',
  },
  filter: {},
};

/* eslint-disable default-case, no-param-reassign */
const agencyReducer = (state = initialState, action) =>
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
        draft.filter = initialState.filter;
        break;

      case types.SET_FILTER_VALUE:
        draft.filter[action.payload.key] = action.payload.value;
        break;
      case types.CLEAR_FILTER:
        draft.filter = initialState.filter;
        break;

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

      case types.LOAD_ONE_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ONE_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_ONE_SUCCESS:
        draft.one = { ...initialState.one, ...action.payload.data };
        draft.loading = false;
        break;
    }
  });

export default agencyReducer;
