/*
 *
 * Career reducer
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
  applied_users: { data: [], page: 1, size: 10, totaldata: 0 },
  one: {
    job_title: '',
    // job_descriptions: '',
    skill_requirements: '',
    slug_url: '',
    deadline_at: '',
    no_of_vaccancy: 1,
  },
  query: { find_title: '', size: 10 },
  loading: false,
  errors: { job_title: '', slug_url: '' },
};

/* eslint-disable default-case, no-param-reassign */
const careerReducer = (state = initialState, action) =>
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

      case types.LOAD_APPLIED_USERS_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_APPLIED_USERS_SUCCESS:
        draft.applied_users = action.payload;
        draft.loading = false;
        break;
      case types.LOAD_APPLIED_USERS_FAILURE:
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
        // console.log(action.payload.key, action.payload.value);
        draft.query[action.payload.key] = action.payload.value;
        break;
      case types.CLEAR_QUERY:
        draft.query = initialState.query;
        break;
    }
  });

export default careerReducer;
