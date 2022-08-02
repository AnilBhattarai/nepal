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
  authorData: {
    author: {
      is_verified: false,
      bio: '',
    },
    social_link: {
      fb: '',
      twitter: '',
      linkedIn: '',
    },
    image: {},
  },
  query: { find_name: '', find_email: '', find_is_verified: '' },
  loading: false,
  errors: { name: '', roles: '', password: '' },
};
// Object.keys(action.payload.value).filter(e => {draft.one.users[e] !== ''})

/* eslint-disable default-case, no-param-reassign */
const adminAuthorsManagePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_QUERY_VALUE:
        draft.query[action.payload.key] = action.payload.value;
        break;
      case types.SET_AUTHOR_VALUE:
        draft.authorData.author[action.payload.key] = action.payload.value;
        break;
      case types.SET_ONE_VALUE:
        draft.authorData[action.payload.key] = action.payload.value;
        break;

      case types.ADD_PHOTO_REQUEST:
        draft.loading = true;
        break;
      case types.ADD_PHOTO_SUCCESS:
        draft.authorData = {
          ...draft.authorData,
          image: { ...action.payload.data.image },
        };
        draft.loading = false;
        break;
      case types.ADD_PHOTO_FAILURE:
        draft.loading = false;
        break;
      case types.AUTHOR_DATA_SUCCESS:
        draft.loading = false;
        draft.authorData = {
          ...initialState.authorData,
          ...action.payload.data,
        };
        break;
      case types.AUTHOR_DATA_FAILURE:
        draft.loading = false;
        break;
      case types.AUTHOR_DATA_REQUEST:
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
      case types.SET_SOCIAL_LINK_VALUE:
        draft.authorData.social_link[action.payload.key] = action.payload.value;
        break;
    }
  });

export default adminAuthorsManagePageReducer;
