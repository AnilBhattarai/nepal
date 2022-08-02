/* eslint-disable no-case-declarations */
/*
 *
 * BlogCommentManagePage reducer
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
    blog_id: '',
    status: '',
    is_approved: false,
    is_disapproved: false,
  },
  status: ['approved', 'onhold', 'disapproved', 'posted'],
  comment_from: ['blog', 'forum', 'property'],
  loading: false,
  query: {
    find_title: '',
    find_blog_id: '',
    find_is_approved: true,
    find_is_disapproved: false,
    size: 10,
    find_cmnt_status: '',
    find_cmnt_for: '',
  },
  selected: [],
  listed_id: [],
  selectAll: false,
};

/* eslint-disable default-case, no-param-reassign */
const blogCommentManagePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    let helperObj = {};
    switch (action.type) {
      case types.CLEAR_QUERY:
        draft.query = initialState.query;
        break;
      case types.LOAD_ALL_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ALL_SUCCESS:
        draft.selectAll = false;
        draft.all = action.payload;
        draft.loading = false;
        const newData = action.payload.data;
        draft.selected = initialState.selected;
        for (let index = 0; index < newData.length; index++) {
          draft.selected = [...draft.selected, false];
        }
        draft.listed_id = initialState.listed_id;
        break;
      case types.LOAD_ALL_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_ONE_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ONE_SUCCESS:
        draft.loading = false;
        draft.one = { ...draft.one, ...action.payload.data };
        break;
      case types.LOAD_ONE_FAILURE:
        draft.loading = false;
        break;
      case types.SET_QUERY_VALUE:
        draft.query[action.payload.key] = action.payload.value;
        break;
      case types.SET_ONE_VALUE:
        draft.one = action.payload;
        break;
      case types.SET_STATUS_VALUE:
        draft.one.status = action.payload;
        break;

      case types.SET_SELECTED_VALUE:
        draft.selected[action.payload] = !state.selected[action.payload];
        break;

      case types.SET_SELECTED_ALL:
        for (let index = 0; index < draft.selected.length; index++) {
          draft.selected[index] = action.payload;
        }
        break;

      case types.SET_LISTED_VALUE:
        const value = draft.all.data[action.payload]._id;
        const index = draft.listed_id.indexOf(value);
        if (index >= 0) {
          const chipData = [...draft.listed_id];
          chipData.splice(index, 1);
          draft.listed_id = chipData;
        } else {
          draft.listed_id = [...draft.listed_id, value];
        }
        break;

      case types.SET_LISTED_ALL:
        const currentData = draft.all.data;
        if (action.payload === true) {
          for (let index = 0; index < currentData.length; index++) {
            draft.listed_id = [...draft.listed_id, currentData[index]._id];
          }
        } else {
          draft.listed_id = initialState.listed_id;
        }
        break;

      case types.SET_SELECTALL:
        draft.selectAll = action.payload;
        break;

      case types.APPROVE_DISAPPROVE_REQUEST:
        draft.loading = true;
        break;
      case types.APPROVE_DISAPPROVE_SUCCESS:
        draft.loading = false;
        break;
      case types.APPROVE_DISAPPROVE_FAILURE:
        draft.loading = false;
        break;
    }
  });

export default blogCommentManagePageReducer;
