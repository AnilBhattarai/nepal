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
  // file_data: [],
  one: {
    email: '',
    name: '',
    cover_letter: '',
    phone: '',
    cvFile: null,
  },
  detail: {
    no_of_vacancy: 1,
    job_title: '',
    job_descriptions: '',
    skill_requirements: '',
    deadline_at: '',
    published_on: '',
  },
  query: { find_title: '', size: 10 },
  loading: false,
  errors: {
    name: '',
    email: '',
    phone: '',
    cvFile: '',
    cover_letter: '',
  },
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

      case types.LOAD_ONE_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ONE_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_ONE_SUCCESS:
        // console.log('from saga one value:', action.payload);
        draft.detail = { ...draft.detail, ...action.payload.data };
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
      // case types.ADD_MEDIA_REQUEST:
      //   draft.loading = true;
      //   break;
      case types.ADD_MEDIA_SUCCESS:
        // draft.all = {
        //   ...draft.all,
        //   data: [...draft.all.data, ...action.payload.data],
        // };
        console.log('from reducer', action.payload);
        draft.one.cvFile = { ...action.payload };
        // draft.loading = false;
        break;
      case types.DELETE_MEDIA_SUCCESS:
        // draft.all = {
        //   ...draft.all,
        //   data: draft.all.data.filter(
        //     each => each._id !== action.payload.data._id,
        //   ),
        // };
        // console.log('action.payload', action.payload);
        // draft.one.cvFile = draft.cvFile.filter(
        //   each => each._id !== action.payload.data._id,
        // );
        draft.one.cvFile = {};
        break;
      // check for addEdit
      case types.APPLY_REQUEST:
        draft.loading = true;
        break;
      case types.APPLY_FAILURE:
        // console.log('error', action.payload.errors);
        draft.errors = action.payload.errors;
        draft.loading = false;
        break;
      // case types.APPLY_SUCCESS:
      //   draft.all = {
      //     ...draft.all,
      //     data: [...draft.all.data, ...action.payload.data],
      //   };
      //   draft.loading = false;
      //   break;
    }
  });

export default careerReducer;
