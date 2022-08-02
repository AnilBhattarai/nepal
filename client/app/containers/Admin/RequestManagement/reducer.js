/*
 *
 * RequestManagement reducer
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
    email: '',
    message: '',
    purpose: '5d64d7f71dcc3723d0909c82',
    phone_no: '',
    mobile_no: '',
    address: {
      state_id: '', //enum
      district_id: '', //enum
      city_id: '', //enum
      area_id: '', // enum
    },
    price: '',
    price_label: '5d6ce42373552113c039602f',
  },
  purpose: [],
  query: { find_name: '', size: 10 },
  loading: false,
  errors: {},
  location: {
    allState: [],
    allDistrict: [],
    allVdc: [],
    allArea: [],
  },
  prices: [],
};

/* eslint-disable default-case, no-param-reassign */
const requestManagementReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
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
        draft.one = { ...initialState.one, ...action.payload.data };
        draft.loading = false;
        break;
      case types.DELETE_ONE_SUCCESS:
        draft.all = {
          ...draft.all,
          data: draft.all.data.filter(
            each => each._id !== action.payload.data._id,
          ),
        };
        break;

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
      case types.LOAD_PURPOSE_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_PURPOSE_SUCCESS:
        draft.purpose = action.payload.data;
        draft.loading = false;
        break;
      case types.LOAD_PURPOSE_FAILURE:
        draft.loading = false;
        break;

      case types.LOAD_LOCATION_SUCCESS:
        draft.location = action.payload.data;
        break;

      case types.LOAD_PRICE_SUCCESS:
        draft.prices = action.payload.data;
        break;
    }
  });

export default requestManagementReducer;
