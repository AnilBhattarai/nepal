import * as types from './news.types';
import {
  newsGet,
  blogCatGet,
  optionsGet,
  newsCommentPost,
  newsLatestGet,
  newsCommentGet,
  highlightedNewsGet,
  newsDetailsGet,
  deleteComment,
  otherCommentGet,
} from '../../api';
import Toast from 'react-native-tiny-toast';

export const newsData = payload => async dispatch => {
  dispatch({ type: types.NEWS_DATA_REQUEST });
  try {
    // console.log(payload, 'payload');
    const response = await newsGet(payload);
    //console.log('response', response.data);
    dispatch({ type: types.NEWS_DATA_SUCCESS, payload: response.data });
    return response;
  } catch (err) {
    dispatch({ type: types.NEWS_DATA_FAILURE, payload: err });
    throw err;
  }
};
export const highlightedNewsData = () => async dispatch => {
  dispatch({ type: types.HIGHLIGHTED_NEWS_GET_REQUEST });
  try {
    // console.log(payload, 'payload');
    const response = await highlightedNewsGet();
    // console.log('response', response.data);
    dispatch({ type: types.HIGHLIGHTED_NEWS_GET_SUCCESS, payload: response.data });
    return response;
  } catch (err) {
    dispatch({ type: types.HIGHLIGHTED_NEWS_GET_FAILURE, payload: err });
    throw err;
  }
};
export const loadMoreRequest = payload => async dispatch => {
  dispatch({ type: types.LOAD_MORE_REQUEST });
  try {
    const response = await newsGet(payload);
    dispatch({ type: types.LOAD_MORE_SUCCESS, payload: response.data });
    return response;
  } catch (err) {
    dispatch({ type: types.LOAD_MORE_FAILURE, payload: err });
    throw err;
  }
};
export const latestNewsData = () => async dispatch => {
  dispatch({ type: types.NEWS_LATEST_REQUEST });
  try {
    // console.log(payload, 'payload');
    const response = await newsLatestGet();
    //console.log('response', response.data);
    dispatch({ type: types.NEWS_LATEST_SUCCESS, payload: response.data });
    return response;
  } catch (err) {
    dispatch({ type: types.NEWS_LATEST_FAILURE, payload: err });
    throw err;
  }
};
export const blogData = payload => async dispatch => {
  dispatch({ type: types.BLOG_DATA_REQUEST });
  try {
    //console.log(payload, 'payload');
    const response = await optionsGet(payload);
    // console.log('response', response.data);
    dispatch({ type: types.BLOG_DATA_SUCCESS, payload: response.data });
    return response;
  } catch (err) {
    dispatch({ type: types.BLOG_DATA_FAILURE, payload: err });
    throw err;
  }
};
export const commentGetData = payload => async dispatch => {
  dispatch({ type: types.COMMENT_GET_REQUEST });
  try {
    // console.log(payload, 'payload');
    const response = await newsCommentGet(payload);
    // console.log('response', response.data);
    dispatch({ type: types.COMMENT_GET_SUCCESS, payload: response.data });
    return response;
  } catch (err) {
    dispatch({ type: types.COMMENT_GET_FAILURE, payload: err });
    throw err;
  }
};
export const deleteCommentData = (payload) => async (dispatch) => {
  dispatch({ type: types.DELETE_COMMENT_REQUEST });
  try {
    // console.log(payload, 'payload');
    const response = await deleteComment(payload);
    // console.log(response, 'response')
    dispatch({
      type: types.DELETE_COMMENT_SUCCESS,
      payload: response.data,
    });
    return response;
    // console.log(response.data.msg)
  } catch (err) {
    dispatch({ type: types.DELETE_COMMENT_FAILURE, payload: err });
    Toast.show(err.response.data.msg);
    throw err;
  }
};
export const deleteCommentSuccess = (payload) => async (dispatch) => {
  dispatch({ type: types.DELETE_REQUEST });
  try {
    // console.log(payload, 'payload');
    const response = await newsCommentGet(payload);
    // console.log(response, 'response')
    dispatch({
      type: types.DELETE_SUCCESS,
      payload: response.data,
    });
    return response;
    // console.log(response.data.msg)
  } catch (err) {
    dispatch({ type: types.DELETE_FAILURE, payload: err });
    Toast.show(err.response.data.msg);
    throw err;
  }
};
export const blogCategoryData = () => async dispatch => {
  dispatch({ type: types.BLOG_CAT_DATA_REQUEST });
  try {
    //console.log(payload, 'payload');
    const response = await blogCatGet();
    //console.log('response', response.data);
    dispatch({ type: types.BLOG_CAT_DATA_SUCCESS, payload: response.data });
    return response;
  } catch (err) {
    dispatch({ type: types.BLOG_CAT_DATA_FAILURE, payload: err });
    throw err;
  }
};
export const newsCommentPostData = payload => async dispatch => {
  dispatch({ type: types.NEWS_COMMENT_REQUEST });
  try {
    // console.log(payload, 'payload');
    const response = await newsCommentPost(payload);
    //console.log('response', response.data);
    dispatch({
      type: types.NEWS_COMMENT_SUCCESS,
      payload: response.data,
    });
    Toast.showSuccess('Comment Posted Sucessfully!');
    return response;
  } catch (err) {
    dispatch({ type: types.NEWS_COMMENT_FAILURE, payload: err.response.data.msg });
    Toast.show(err.response.data.msg);
    throw err;
  }
};

export const setCommentValue = payload => dispatch => {
  dispatch({
    type: types.SET_NEWS_COMMENT_DATA,
    payload,
  });
};
export const clearNews = payload => dispatch => {
  dispatch({
    type: types.CLEAR_NEWS_DATA,
    payload,
  });
};
export const clearNewsDetails = payload => dispatch => {
  dispatch({
    type: types.CLEAR_NEWS_DETAILS,
    payload,
  });
};
export const clearNewsCommentField = () => dispatch => {
  dispatch({
    type: types.CLEAR_NEWS_COMMENT_FIELD,
  });
};

export const setLoadMore = payload => dispatch => {
  dispatch({
    type: types.SET_LOAD_MORE_INDICATOR,
    payload,
  });
};
export const newsDetailsGetData = payload => async dispatch => {
  dispatch({ type: types.NEWS_DETAILS_GET_REQUEST });
  try {
    // console.log(payload, 'payload');
    const response = await newsDetailsGet(payload);
    // console.log(response, 'response');
    dispatch({ type: types.NEWS_DETAILS_GET_SUCCESS, payload: response.data });
    return response;
  } catch (err) {
    dispatch({ type: types.NEWS_DETAILS_GET_FAILURE, payload: err });
    throw err;
  }
};
export const setEditCommentValue = (payload) => (dispatch) => {
  dispatch({
    type: types.SET_EDIT_COMMENT_DATA,
    payload,
  });
};
export const editCommentPostData = (payload) => async (dispatch) => {
  dispatch({ type: types.EDIT_COMMENT_PROPERTIES_REQUEST });
  try {
    // console.log(payload, 'payload');
    const response = await newsCommentPost(payload);
    //console.log('response', response.data);
    dispatch({
      type: types.EDIT_COMMENT_PROPERTIES_SUCCESS,
      payload: response.data,
    });
    Toast.showSuccess('Comment Edited!');
    return response;
  } catch (err) {
    dispatch({
      type: types.EDIT_COMMENT_PROPERTIES_FAILURE,
      payload: err.response.data,
    });
    Toast.show(err.response.data.msg);
    throw err;
  }
};

export const otherCommentGetData = (payload) => async (dispatch) => {
  dispatch({ type: types.OTHERS_COMMENT_GET_REQUEST });
  try {
    // console.log(payload, 'payload');
    const response = await otherCommentGet(payload);
    // console.log(response.data, 'response');
    dispatch({
      type: types.OTHERS_COMMENT_GET_SUCCESS,
      payload: response.data,
    });
    return response;
  } catch (err) {
    dispatch({
      type: types.OTHERS_COMMENT_GET_FAILURE,
      payload: err.response.data,
    });
    Toast.show(err.response.data.msg);
    throw err;
  }
};