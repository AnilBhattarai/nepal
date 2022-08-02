/*
 *
 * Directory reducer
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
    phone: [],
    address: '',
    description: '',
    website: '',
    service_category: '',
    is_active: false,
  },
  query: { find_name: '', size: 10 },
  loading: false,
  errors: { title: '', name: '', email: '' },
  tempPhone: '',
  category: [],
  test_a: [],
};

/* eslint-disable default-case, no-param-reassign */
const directoryReducer = (state = initialState, action) =>
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
        draft.one = { ...initialState.one, ...action.payload.data };
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

      case types.SET_TEMP_PHONE:
        draft.tempPhone = action.payload;
        break;

      case types.LOAD_ENUM_SUCCESS:
        draft.category = action.payload.data.service_category;
        draft.test_a = action.payload.data.service_category;
        break;
    }
  });

export default directoryReducer;
