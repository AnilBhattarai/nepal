/*
 *
 * User reducer
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
    msg: '',
  },
  builderData: {
    builder: {
      is_verified: false,
      bio: '',
    },
  },
  query: {
    find_name: '',
    find_email: '',
    find_is_verified: '',
    page: 1,
    size: 10,
  },
  loading: false,
  errors: { name: '', roles: '', password: '' },
};
// Object.keys(action.payload.value).filter(e => {draft.one.users[e] !== ''})

/* eslint-disable default-case, no-param-reassign */
const adminBuildersManagePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_QUERY_VALUE:
        draft.query[action.payload.key] = action.payload.value;
        break;
      case types.SET_BUILDER_VALUE:
        draft.builderData.builder[action.payload.key] = action.payload.value;
        break;
      case types.BUILDER_DATA_SUCCESS:
        draft.loading = false;
        draft.builderData = action.payload.data;
        break;
      case types.BUILDER_DATA_FAILURE:
        draft.loading = false;
        break;
      case types.BUILDER_DATA_REQUEST:
        draft.loading = true;
        break;
      case types.SET_QUERY_OBJ:
        draft.query = action.payload;
        break;
      case types.CLEAR_QUERY:
        draft.query = initialState.query;
        break;
      case types.CLEAR_ERRORS:
        draft.errors = initialState.errors;
        break;
      case types.LOAD_ALL_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ALL_SUCCESS:
        draft.loading = false;
        draft.all = action.payload;
        break;
      case types.LOAD_ALL_FAILURE:
        draft.loading = false;
        break;
    }
  });

export default adminBuildersManagePageReducer;
