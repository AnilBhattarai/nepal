/*
 *
 * HomeLoanForm reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  one: {
    full_name: '',
    email: '',
    mobile: '',
    is_identified: 'Yes',
    type_of_property: '',
    looking_for_city: '',
    resident_status: 'Resident Nepalese',
    employment_type: 'Salaried',
    monthly_income: '',
    is_co_borrower: 'No',
    is_active: false,
    bank_name: '',
  },
  loading: false,
  errors: {},
  city: [],
  bankName: '',
  banks: { data: [], size: 10, totaldata: 0, page: 1 },
  loading_more: false,
};

/* eslint-disable default-case, no-param-reassign */
const homeLoanFormReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_ONE_VALUE:
        draft.one[action.payload.key] = action.payload.value;
        draft.errors[action.payload.errors] = ' ';
        break;
      case types.ADD_EDIT_REQUEST:
        draft.loading = true;
        break;
      case types.ADD_EDIT_FAILURE:
        draft.errors = action.payload.errors;
        draft.loading = false;
        break;
      case types.ADD_EDIT_SUCCESS:
        draft.errors = initialState.errors;
        draft.one = initialState.one;
        draft.loading = false;
        break;
      case types.CLEAR_ERRORS:
        draft.errors = initialState.errors;
        break;
      case types.CLEAR_ONE:
        draft.one = initialState.one;
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
      case types.SET_BANK_NAME:
        draft.bankName = action.payload;
        draft.one.bank_name = action.payload;
        break;
      case types.LOAD_BANK_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_BANK_SUCCESS:
        draft.loading = false;
        draft.banks = action.payload;
        break;
      case types.LOAD_BANK_FAILURE:
        draft.loading = false;
        break;

      case types.LOAD_MORE_BANK_REQUEST:
        draft.loading_more = true;
        break;
      case types.LOAD_MORE_BANK_SUCCESS:
        const newData = draft.banks.data.concat(action.payload.data);

        draft.loading_more = false;
        draft.banks = { ...action.payload, data: newData };
        break;
      case types.LOAD_MORE_BANK_FAILURE:
        draft.loading_more = false;
        break;
    }
  });

export default homeLoanFormReducer;
