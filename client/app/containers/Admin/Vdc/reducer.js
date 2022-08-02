/*
 *
 *  vdc reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  all: {
    data: [],
    size: 10,
    totaldata: 0,
    page: 1,
  },
  one: {
    name: '',
    state_id: { name: '', slug: '' },
    district_id: { name: '', slug: '' },
    areas: [],
  },
  query: { size: 10, find_name: '', district_id: '', state_id: '' },
  loading: false,
  active_status: {
    loading: false,
    id: '',
  },
  district: [],
  state: [],
  errors: {
    name: '',
  },
};

/* eslint-disable default-case, no-param-reassign */
const vdcReducer = (state = initialState, action) =>
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
      case types.LOAD_ONE_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ONE_SUCCESS:
        draft.one = action.payload.data;
        draft.loading = false;
        break;
      case types.LOAD_ONE_FAILURE:
        draft.loading = false;
        break;
      case types.ADD_EDIT_SUCCESS:
        draft.loading = false;
        break;
      case types.ADD_EDIT_FAILURE:
        draft.errors = action.payload.errors;
        draft.loading = false;
        break;
      case types.DELETE_ONE_REQUEST:
        draft.loading = true;
        break;
      case types.DELETE_ONE_SUCCESS:
        draft.all = {
          ...draft.all,
          data: draft.all.data.filter(
            each => each._id != action.payload.data._id,
          ),
        };
        draft.loading = false;
        break;
      case types.DELETE_ONE_FAILURE:
        draft.loading = false;
        break;
      case types.SET_IS_ACTIVE:
        draft.one = { ...draft.one, is_active: !draft.one.is_active };
        break;
      case types.SET_ONE_VALUE:
        draft.one[action.payload.key] = action.payload.value;
        draft.errors[action.payload.errors] = ' ';
        break;
      case types.CLEAR_ONE:
        draft.one = initialState.one;
        break;
      case types.SET_QUERY_VALUE:
        draft.query[action.payload.key] = action.payload.value;
        break;
      case types.CLEAR_ERRORS:
        draft.errors = initialState.errors;
        break;
      case types.CLEAR_QUERY:
        draft.query = initialState.query;
        break;
      case types.LOAD_DISTRICT_SUCCESS:
        draft.district = action.payload.data;
        break;
      case types.LOAD_STATE_SUCCESS:
        draft.state = action.payload.data;
        break;
      case types.ADD_AREA:
        draft.one.areas = [...draft.one.areas, { name: '' }];
        break;
      case types.SET_AREA:
        draft.one.areas[action.payload.index].name = action.payload.value;
        break;
      case types.DELETE_AREA:
        draft.one.areas.splice(action.payload.index, 1);
        break;
      case types.ADD_IS_ACTIVE_REQUEST:
        draft.active_status.loading = true;
        draft.active_status.id = action.payload._id;
        break;
      case types.ADD_IS_ACTIVE_FAILURE:
        draft.active_status.loading = false;
        draft.active_status.id = '';
        break;
      case types.ADD_IS_ACTIVE_SUCCESS:
        console.log('value from reducer', action.payload);
        draft.all.data = draft.all.data.map(each =>
          each._id == action.payload.data._id
            ? { ...each, is_active: !each.is_active }
            : { ...each },
        );
        draft.active_status.id = '';
        draft.active_status.loading = false;
        break;
    }
  });

export default vdcReducer;
