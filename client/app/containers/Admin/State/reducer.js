/*
 *
 * State reducer
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
    districts: [],
  },
  query: { size: 10, find_name: '' },
  loading: false,
  active_status: {
    loading: false,
    id: '',
  },
  errors: {
    state_name: '',
    districts: [],
  },
};

/* eslint-disable default-case, no-param-reassign */
const stateReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_ALL_REQUEST:
        draft.loading = true;
        draft.active_loading = true;
        break;
      case types.LOAD_ALL_FAILURE:
        draft.loading = false;
        draft.active_loading = false;
        break;
      case types.LOAD_ALL_SUCCESS:
        draft.all = action.payload;
        draft.loading = false;
        draft.active_loading = false;
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
      // case types.SET_IS_ACTIVE:
      //   console.log('value form reducer', action.payload);
      //   draft.all.data[action.payload.index].is_active = !action.payload.status;
      //   break;
      case types.SET_ONE_VALUE:
        draft.one[action.payload.key] = action.payload.value;
        draft.errors[action.payload.errors] = '';
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
      case types.ADD_DISTRICT:
        draft.one.districts = [...draft.one.districts, { name: '' }];
        break;
      case types.SET_DISTRICT:
        console.log('action.payload', action.payload);
        draft.one.districts[action.payload.index].name = action.payload.value;
        break;
      case types.DELETE_DISTRICT:
        draft.one.districts.splice(action.payload.index, 1);
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

export default stateReducer;
