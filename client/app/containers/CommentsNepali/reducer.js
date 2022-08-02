/*
 *
 * Comments reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  one: {
    title: '',
    _id: '',
  },
  comments: {
    comment: [],
    totaldata: 0,
  },
  ownComments: {
    data: { comment: [] },
    page: 1,
    size: 10,
    totaldata: 0,
  },
  commentPostLoading: false,
  commentLoading: false,
  replyRequesting: false,
};

/* eslint-disable default-case, no-param-reassign */
const commentsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_COMMENT_REQUEST:
        draft.commentLoading = true;
        break;
      case types.LOAD_COMMENT_SUCCESS:
        draft.comments = action.payload.data;
        draft.commentLoading = false;
        break;
      case types.LOAD_COMMENT_FAILURE:
        draft.commentLoading = false;
        break;
      case types.SET_ONE_VALUE:
        draft.one[action.payload.key] = action.payload.value;
        break;
      case types.LOAD_ONE_SUCCESS:
        draft.one = action.payload.data;
        break;
      case types.CLEAR_ONE:
        draft.one.title = initialState.one.title;
        break;

      case types.POST_COMMENT_REQUEST:
        draft.commentPostLoading = true;
        break;

      case types.POST_COMMENT_SUCCESS:
        // draft.comments = {
        //   ...draft.comments,
        //   comment: [action.payload.data, ...draft.comments.comment],
        //   totaldata: draft.comments.totaldata + 1,
        // };
        draft.ownComments = {
          ...draft.ownComments,
          data: {
            ...draft.ownComments.data,
            comment: [action.payload.data, ...draft.ownComments.data.comment],
          },
          totaldata: draft.comments.totaldata + 1,
        };
        draft.commentPostLoading = false;
        draft.one = { ...initialState.one, blog_id: state.one.blog_id };
        break;

      case types.POST_COMMENT_FAILURE:
        draft.commentPostLoading = false;
        break;

      case types.EDIT_COMMENT_SUCCESS:
        draft.comments = {
          ...state.comments,
          comment: state.comments.comment.map(each => {
            if (action.payload.data._id === each._id)
              return action.payload.data;
            return each;
          }),
        };
        draft.one = { ...initialState.one, blog_id: state.one.blog_id };
        break;

      case types.DELETE_COMMENT_SUCCESS: // comment delete logic
        draft.ownComments = {
          data: {
            ...draft.ownComments.data,
            comment: draft.ownComments.data.comment.filter(
              each => each._id !== action.payload.data._id,
            ),
          },
          totaldata:
            draft.comments.totaldata - 1 !== 0
              ? draft.comments.totaldata - 1
              : '',
        };
        break;

      case types.OWN_COMMENT_REQUEST:
        draft.commentLoading = true;
        break;
      case types.OWN_COMMENT_SUCCESS:
        draft.ownComments = action.payload;
        draft.commentLoading = false;
        break;
      case types.OWN_COMMENT_FAILURE:
        draft.commentLoading = false;
        break;

      case types.REPLY_COMMENT_REQ:
        draft.replyRequesting = true;
        break;
      case types.REPLY_COMMENT_FAIL:
        draft.replyRequesting = false;
        break;
      case types.REPLY_COMMENT_SUCCESS:
        draft.replyRequesting = false;
        draft.comments = {
          ...state.comments,
          comment: state.comments.comment.map(each => {
            if (each._id === action.payload.data._id) {
              return action.payload.data;
            }
            return each;
          }),
        };
        break;
      case types.LOAD_MY_COMMENT_SUCCESS:
        draft.ownComments = {
          ...draft.ownComments,
          data: {
            ...draft.ownComments.data,
            comment: draft.ownComments.data.comment.map(each => {
              if (each._id === action.payload.data._id) {
                return action.payload.data;
              }
            }),
          },
        };
        break;
    }
  });

export default commentsReducer;
