/*
 *
 * WantedProperty reducer
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
  listing: {
    data: [],
    page: 1,
    size: 10,
    totaldata: 0,
  },
  loading: false,
  query: {},
  form: {
    name: '',
    email: '',
    message: '',
    purpose: '',
    phone_no: '',
    address: {
      state_id: '',
      district_id: '',
      city_id: '',
      area_id: '',
      street_address: '',
    },
    price: '',
    price_label: '',
  },
  purpose: [],
  category: [],
  priceLabel: [],
  openForm: false,
  form_loading: false,
  errors: {},
  locations: {
    state: [],
    district: [],
    city: [],
    area: [],
  },
};

/* eslint-disable default-case, no-param-reassign */
const wantedPropertyReducer = (state = initialState, action) =>
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
      case types.LOAD_LISTING_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_LISTING_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_LISTING_SUCCESS:
        draft.listing = action.payload;
        draft.loading = false;
        break;
      case types.LOAD_PURPOSE_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_PURPOSE_SUCCESS:
        draft.purpose = action.payload.data.property_purpose;
        draft.category = action.payload.data.property_category;
        draft.priceLabel = action.payload.data.price_label;
        draft.loading = false;
        break;
      case types.LOAD_PURPOSE_FAILURE:
        draft.loading = false;
        break;
      case types.SET_FORM_VALUE:
        draft.form[action.payload.key] = action.payload.value;
        break;
      case types.SET_FORM_OPEN:
        draft.openForm = action.payload;
        break;
      case types.MAKE_FORM_REQUEST:
        draft.form_loading = true;
        break;
      case types.MAKE_FORM_FAILURE:
        draft.errors = action.payload.errors;
        draft.form_loading = false;

        break;
      case types.MAKE_FORM_SUCCESS:
        draft.form = initialState.form;
        draft.form_loading = false;
        draft.openForm = false;
        draft.errors = initialState.errors;
        break;

      case types.LOAD_LOCATION_SUCCESS:
        draft.locations = {
          ...draft.locations,
          state: action.payload.data.allState,
          district: action.payload.data.allDistrict,
          city: action.payload.data.allVdc,
          allArea: action.payload.data.allArea,
        };
        break;
    }
  });

export default wantedPropertyReducer;
