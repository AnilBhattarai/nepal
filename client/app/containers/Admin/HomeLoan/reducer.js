/*
 *
 * HomeLoan reducer
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
    full_name: '',
    email: '',
    mobile: '',
    is_identified: false,
    type_of_property: '',
    looking_for_city: '',
    resident_status: '',
    employment_type: '',
    monthly_income: '',
    is_co_borrower: false,
    is_active: false,
  },
  query: { size: 10, page: 1 },
  loading: false,
  errors: {},
  city: [],
};

/* eslint-disable default-case, no-param-reassign */
const homeLoanReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_ALL_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ALL_SUCCESS:
        draft.all = action.payload;
        draft.loading = false;
        break;

      case types.LOAD_ALL_FAILURE:
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
      case types.LOAD_CITY_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_CITY_SUCCESS:
        draft.loading = false;
        draft.city = action.payload.data.allArea;
        break;
      case types.LOAD_CITY_FAILURE:
        draft.loading = false;
        break;
    }
  });

export default homeLoanReducer;
