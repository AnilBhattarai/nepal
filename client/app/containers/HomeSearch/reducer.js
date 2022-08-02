/*
 *
 * HomeSearch reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  enums: {},
  locations: {},
  filter: {
    find_property_category: null,
    find_property_type: null,
    find_selected_price: null,
    find_property_face: null,
    find_road_access_road_type: null,
    find_is_negotiable: false,
    find_is_premium: false,
    find_is_featured: false,
    find_property_purpose: '',
    find_location: '',
  },
  loading: false,
  query: { sort: '1' },
};

/* eslint-disable default-case, no-param-reassign */
const homeSearchReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_ENUM_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ENUM_SUCCESS:
        draft.enums = action.payload.data;
        draft.loading = false;
        break;
      case types.LOAD_ENUM_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_FILTER_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_FILTER_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_FILTER_SUCCESS:
        draft.filter = action.payload.data;
        draft.loading = false;
        break;
      case types.SET_FILTER_VALUE:
        draft.filter[action.payload.key] = action.payload.value;
        // draft.errors[action.payload.errors] = ' ';
        break;
      case types.CLEAR_FILTER_VALUES:
        draft.filter = initialState.filter;
        draft.query = { sort: '1' };
        break;
      case types.SET_QUERY_VALUE:
        state.query[action.payload.key] = action.payload.value;
        break;
      case types.CLEAR_QUERY:
        draft.query = { sort: 1 };
        break;
      case types.LOAD_LOCATION_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_LOCATION_SUCCESS:
        draft.locations = action.payload.data;
        draft.loading = false;
        break;
      case types.LOAD_LOCATION_FAILURE:
        draft.loading = false;
        break;
    }
  });

export default homeSearchReducer;
