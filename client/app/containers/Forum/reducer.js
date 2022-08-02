/*
 *
 * Forum reducer
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
    title: '',
    description: '',
    added_by: '',
    updated_at: '',
    status: '',
  },
  my: {
    data: [],
    page: 1,
    size: 10,
    totaldata: 0,
  },
  query: { find_forum: '', size: 10 },
  loading: false,
  myLoading: false,
  errors: { question: '', description: '' },
};

/* eslint-disable default-case, no-param-reassign */
const forumReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_ONE_VALUE:
        draft.one[action.payload.key] = action.payload.value;
        draft.errors[action.payload.key] = '';
        break;
      case types.CLEAR_ONE:
        draft.one = initialState.one;
        break;
      case types.SET_QUERY_VALUE:
        draft.query[action.payload.key] = action.payload.value;
        break;
      case types.SET_FORUM_DATA:
        draft.one[action.payload.key] = action.payload.value;
        break;
      case types.CLEAR_QUERY:
        draft.query = initialState.query;
        break;
      case types.LOAD_ALL_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ALL_SUCCESS:
        draft.loading = false;
        draft.all = action.payload;
        break;
      case types.LOAD_MY_REQUEST:
        draft.myLoading = true;
        break;
      case types.LOAD_MY_SUCCESS:
        draft.myLoading = false;
        draft.my = action.payload;
        break;
      case types.LOAD_ONE_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ONE_SUCCESS:
        draft.one = { ...draft.one, ...action.payload.data };
        draft.loading = false;
        break;
      case types.LOAD_ONE_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_CATEGORY_SUCCESS:
        draft.category = action.payload.data;
        break;
      case types.LOAD_USERS_SUCCESS:
        draft.users = action.payload.data;
        break;

      case types.DELETE_ONE_SUCCESS:
        draft.all = {
          ...draft.all,
          data: draft.all.data.filter(
            each => each._id !== action.payload.data._id,
          ),
        };
        break;

      case types.CLEAR_ERRORS:
        draft.errors = initialState.errors;
        break;
      case types.SET_ERROR_VALUE:
        draft.errors = action.payload;
        break;
      case types.ADD_EDIT_FAILURE:
        draft.errors = action.payload.errors;
        break;
    }
  });

export default forumReducer;
