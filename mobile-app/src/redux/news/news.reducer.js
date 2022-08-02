import produce from 'immer';
import * as types from './news.types';

const INITIAL_STATE = {
  loading: false,
  isLoadMore: false,
  latestNewsLoading: false,
  newsData: { data: [], page: 1, totaldata: 0 },
  newsLatest: {},
  commentGet: {
    comment: [
      {
        _id: '',
        added_at: '',
        added_by: {
          _id: '',
          name: '',
        },
        replies: [],
        status: '',
        title: '',
      },
    ],
    totaldata: 1,
  },
  othersCommentGet: {},
  blogCategory: {},
  newsDetails: {},
  newsCommentPost: {
    title: '',
  },
};
const reducer = (state = INITIAL_STATE, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.BLOG_DATA_REQUEST:
      case types.NEWS_DATA_REQUEST:
        draft.loading = true;
        break;
      case types.HIGHLIGHTED_NEWS_GET_SUCCESS:
      case types.LOAD_MORE_SUCCESS:
      case types.NEWS_DATA_SUCCESS:
        draft.loading = false;
        draft.isLoadMore = false;
        const dataID = new Set(state.newsData.data.map(({ _id }) => _id));
        const combined = [
          ...state.newsData.data,
          ...action.payload.data.filter(({ _id }) => !dataID.has(_id)),
        ];
        draft.newsData = {
          ...action.payload,
          data: combined,
        };
        break;
      case types.BLOG_DATA_FAILURE:
      case types.NEWS_DATA_FAILURE:
        draft.loading = false;
        break;
      case types.CLEAR_NEWS_DATA:
        draft.newsData = INITIAL_STATE.newsData;
        break;
      case types.NEWS_LATEST_REQUEST:
        draft.latestNewsLoading = true;
        break;
      case types.NEWS_LATEST_SUCCESS:
        draft.newsLatest = action.payload;
        draft.latestNewsLoading = false;
        break;
      case types.NEWS_LATEST_FAILURE:
        draft.latestNewsLoading = false;
        break;
      // case types.BLOG_DATA_REQUEST:
      //   draft.loading = true;
      //   break;
      // case types.LOAD_MORE_SUCCESS:
      case types.BLOG_DATA_SUCCESS:
        draft.loading = false;
        draft.isLoadMore = false;
        const blogData = new Set(state.newsData.data.map(({ _id }) => _id));
        const total = [
          ...state.newsData.data,
          ...action.payload.data.filter(({ _id }) => !blogData.has(_id)),
        ];
        draft.newsData = {
          ...action.payload,
          data: total,
        };
        break;
      // case types.BLOG_DATA_FAILURE:
      //   draft.loading = false;
      //   break;
      case types.BLOG_CAT_DATA_SUCCESS:
        draft.blogCategory = action.payload;
        // draft.loading = false;
        break;
      case types.SET_LOAD_MORE_INDICATOR:
        draft.isLoadMore = action.payload;
        break;
      case types.NEWS_COMMENT_SUCCESS:
        draft.newsCommentPost = action.payload;
        break;
      case types.SET_NEWS_COMMENT_DATA:
        draft.newsCommentPost.title = action.payload.value;
        break;
      case types.CLEAR_NEWS_COMMENT_FIELD:
        draft.newsCommentPost = INITIAL_STATE.newsCommentPost;
        break;
      case types.COMMENT_GET_REQUEST:
        draft.loading = true;
        break;
      case types.COMMENT_GET_SUCCESS:
        draft.loading = false;
        draft.commentGet = action.payload.data;
        break;
      case types.COMMENT_GET_FAILURE:
        draft.loading = false;
        break;
      case types.NEWS_DETAILS_GET_REQUEST:
        draft.loading = true;
        break;
      case types.NEWS_DETAILS_GET_SUCCESS:
        draft.loading = false;
        draft.newsDetails = action.payload.data;
        break;
      case types.NEWS_DETAILS_GET_FAILURE:
        draft.loading = false;
        break;
      case types.DELETE_SUCCESS:
        draft.loading = false;
        draft.commentGet = action.payload.data;
        break;
      case types.SET_EDIT_COMMENT_DATA:
        draft.commentGet.comment[action.payload.index][action.payload.key] =
          action.payload.value;
        break;
      case types.CLEAR_NEWS_DETAILS:
        draft.newsDetails = INITIAL_STATE.newsDetails;
        break;
      case types.OTHERS_COMMENT_GET_SUCCESS:
        draft.othersCommentGet = action.payload.data;
        break;
    }
  });
export default reducer;
