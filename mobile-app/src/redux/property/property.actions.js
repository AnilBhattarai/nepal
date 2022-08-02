import * as types from './property.types';
import {
  recentpropertyGet,
  recentpropertyGetAll,
  projectGet,
  favouriteData,
  favouriteDataGet,
  wantedPropertyGet,
  wantedPropertyGetAll,
  projectGetAll,
  commentPost,
  editCommentPost,
  offerPost,
  myrequest,
  favoriteGet,
  myPropertyGet,
  bankDetailsGet,
  applyLoanPost,
  homeSliderGet,
  userInfoPropertyGet,
  trendingPropertyGetAll,
  agencyGet,
  propertyByAgent,
  propertyByAgentAll,
  commentGet,
  deleteComment,
} from '../../api';
import { hotPropertyGet, detailProperty, hotPropertyGetAll } from '../../api';
import { trendingPropertyGet } from '../../api';
import { propertyPost } from '../../api';
import { searchProperty, multiplePhoto } from '../../api';
import Toast from 'react-native-tiny-toast';

export const recentpropertyData = () => async (dispatch) => {
  //parameter ma payload pathaune
  dispatch({ type: types.RECENT_PROPERTY_DATA_REQUEST });
  try {
    // console.log(payload, 'payload');
    const response = await recentpropertyGet(); //ani yeta line
    //console.log('response', response.data);
    dispatch({
      type: types.RECENT_PROPERTY_DATA_SUCCESS,
      payload: response.data,
    });
    return response;
  } catch (err) {
    dispatch({ type: types.RECENT_PROPERTY_DATA_FAILURE, payload: err });
    Toast.show('Recent property not retrieved!');
    throw err;
  }
};
export const recentpropertyDataAll = (payload) => async (dispatch) => {
  //parameter ma payload pathaune
  dispatch({ type: types.RECENT_PROPERTY_DATA_REQUEST_ALL, payload });
  try {
    console.log(payload, 'payload');
    const response = await recentpropertyGetAll(payload); //ani yeta line
    // console.log('response', response.data);
    dispatch({
      type: types.RECENT_PROPERTY_DATA_SUCCESS_ALL,
      payload: response.data,
    });
    return response;
  } catch (err) {
    dispatch({ type: types.RECENT_PROPERTY_DATA_FAILURE_ALL, payload: err });
    Toast.show('Recent property not retrieved!');
    throw err;
  }
};

export const clearRecentData = (payload) => (dispatch) => {
  dispatch({
    type: types.CLEAR_RECENT_DATA_ALL,
    payload,
  });
};
export const hotpropertyData = () => async (dispatch) => {
  dispatch({ type: types.HOT_PROPERTY_DATA_REQUEST });
  try {
    // console.log(payload, 'payload');
    const response = await hotPropertyGet();
    // console.log('response', response.data);
    dispatch({
      type: types.HOT_PROPERTY_DATA_SUCCESS,
      payload: response.data,
    });
    return response;
  } catch (err) {
    dispatch({ type: types.HOT_PROPERTY_DATA_FAILURE, payload: err });
    Toast.show('Premium Property not retrieved!');
    throw err;
  }
};
export const hotpropertyDataAll = () => async (dispatch) => {
  dispatch({ type: types.HOT_PROPERTY_DATA_REQUEST_All });
  try {
    // console.log(payload, 'payload');
    const response = await hotPropertyGetAll();
    // console.log('response', response.data);
    dispatch({
      type: types.HOT_PROPERTY_DATA_SUCCESS_All,
      payload: response.data,
    });
    return response;
  } catch (err) {
    dispatch({ type: types.HOT_PROPERTY_DATA_FAILURE_All, payload: err });
    Toast.show('Premium Property not retrieved!');
    throw err;
  }
};

export const agencyDataGet = (payload) => async (dispatch) => {
  dispatch({ type: types.AGENCY_GET_REQUEST });
  try {
    const response = await agencyGet(payload);
    dispatch({
      type: types.AGENCY_GET_SUCCESS,
      payload: response.data,
    });
    return response;
  } catch (err) {
    dispatch({ type: types.AGENCY_GET_FAILURE, payload: err });
    Toast.show('Agency not Retrieved!');
    throw err;
  }
};
export const propertyByAgencyData = (payload) => async (dispatch) => {
  dispatch({ type: types.PROPERTY_BY_AGENCY_REQUEST });
  try {
    const response = await propertyByAgent(payload);
    dispatch({
      type: types.PROPERTY_BY_AGENCY_SUCCESS,
      payload: response.data,
    });
    return response;
  } catch (err) {
    dispatch({ type: types.PROPERTY_BY_AGENCY_FAILURE, payload: err });
    Toast.show('Agency Property not Retrieved!');
    throw err;
  }
};
export const getCommentData = (payload) => async (dispatch) => {
  dispatch({ type: types.COMMENT_GET_REQUEST });
  try {
    // console.log(payload, 'payload')
    const response = await commentGet(payload);
    // console.log(response.data, 'response')
    dispatch({
      type: types.COMMENT_GET_SUCCESS,
      payload: response.data,
    });
    return response;
  } catch (err) {
    dispatch({ type: types.COMMENT_GET_FAILURE, payload: err });
    // Toast.show('Comment not Retrieved!');
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
    const response = await commentGet(payload);
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
export const propertyByAgencyDataAll = (payload) => async (dispatch) => {
  dispatch({ type: types.PROPERTY_BY_AGENCY_REQUEST_ALL });
  try {
    const response = await propertyByAgentAll(payload);
    dispatch({
      type: types.PROPERTY_BY_AGENCY_SUCCESS_ALL,
      payload: response.data,
    });
    return response;
  } catch (err) {
    dispatch({ type: types.PROPERTY_BY_AGENCY_FAILURE_ALL, payload: err });
    Toast.show('Agency Property not Retrieved!');
    throw err;
  }
};
export const trendingpropertyData = () => async (dispatch) => {
  dispatch({ type: types.TRENDING_PROPERTY_DATA_REQUEST });
  try {
    // console.log(payload, 'payload');
    const response = await trendingPropertyGet();
    //console.log('response', response.data);
    dispatch({
      type: types.TRENDING_PROPERTY_DATA_SUCCESS,
      payload: response.data,
    });
    return response;
  } catch (err) {
    dispatch({ type: types.TRENDING_PROPERTY_DATA_FAILURE, payload: err });
    Toast.show('Featured Property not retrieved!');
    throw err;
  }
};
export const trendingpropertyDataAll = () => async (dispatch) => {
  dispatch({ type: types.TRENDING_PROPERTY_DATA_REQUEST_ALL });
  try {
    // console.log(payload, 'payload');
    const response = await trendingPropertyGetAll();
    //console.log('response', response.data);
    dispatch({
      type: types.TRENDING_PROPERTY_DATA_SUCCESS_ALL,
      payload: response.data,
    });
    return response;
  } catch (err) {
    dispatch({ type: types.TRENDING_PROPERTY_DATA_FAILURE_ALL, payload: err });
    Toast.show('Featured Property not retrieved!');
    throw err;
  }
};
export const projectPropertyData = () => async (dispatch) => {
  dispatch({ type: types.PROJECT_PROPERTY_DATA_REQUEST });
  try {
    // console.log(payload, 'payload');
    const response = await projectGet();
    //console.log('response', response.data);
    dispatch({
      type: types.PROJECT_PROPERTY_DATA_SUCCESS,
      payload: response.data,
    });
    return response;
  } catch (err) {
    dispatch({ type: types.PROJECT_PROPERTY_DATA_FAILURE, payload: err });
    Toast.show('Project Property not retrieved!');
    throw err;
  }
};
export const projectPropertyDataAll = () => async (dispatch) => {
  dispatch({ type: types.PROJECT_PROPERTY_DATA_REQUEST_ALL });
  try {
    // console.log(payload, 'payload');
    const response = await projectGetAll();
    //console.log('response', response.data);
    dispatch({
      type: types.PROJECT_PROPERTY_DATA_SUCCESS_ALL,
      payload: response.data,
    });
    return response;
  } catch (err) {
    dispatch({ type: types.PROJECT_PROPERTY_DATA_FAILURE_ALL, payload: err });
    Toast.show('Project Property not retrieved!');
    throw err;
  }
};
export const commentPostData = (payload) => async (dispatch) => {
  dispatch({ type: types.COMMENT_PROPERTIES_REQUEST });
  try {
    // console.log(payload, 'payload');
    const response = await commentPost(payload);
    //console.log('response', response.data);
    dispatch({
      type: types.COMMENT_PROPERTIES_SUCCESS,
      payload: response.data,
    });
    Toast.showSuccess('Comment Posted Sucessfully!');
    return response;
  } catch (err) {
    dispatch({
      type: types.COMMENT_PROPERTIES_FAILURE,
      payload: err.response.data,
    });
    Toast.show(err.response.data.msg);
    throw err;
  }
};
export const editCommentPostData = (payload) => async (dispatch) => {
  dispatch({ type: types.EDIT_COMMENT_PROPERTIES_REQUEST });
  try {
    // console.log(payload, 'payload');
    const response = await commentPost(payload);
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
export const setCommentValue = (payload) => (dispatch) => {
  dispatch({
    type: types.SET_COMMENT_DATA,
    payload,
  });
};
export const setEditCommentValue = (payload) => (dispatch) => {
  dispatch({
    type: types.SET_EDIT_COMMENT_DATA,
    payload,
  });
};
export const clearEditCommentField = (payload) => (dispatch) => {
  dispatch({
    type: types.CLEAR_EDIT_COMMENT_FIELD,
    payload,
  });
};
export const setLoadMore = (payload) => (dispatch) => {
  dispatch({
    type: types.SET_LOAD_MORE_INDICATOR,
    payload,
  });
};
export const offerPostData = (payload) => async (dispatch) => {
  dispatch({ type: types.OFFER_PROPERTIES_REQUEST });
  try {
    // console.log(payload, 'payload');
    const response = await offerPost(payload);
    //console.log('response', response.data);
    dispatch({
      type: types.OFFER_PROPERTIES_SUCCESS,
      payload: response.data,
    });
    Toast.showSuccess('Message Sent Sucessfully!');
    return response;
  } catch (err) {
    // console.log(err.response.data, 'hello');
    dispatch({
      type: types.OFFER_PROPERTIES_FAILURE,
      payload: err.response.data,
    });
    Toast.show(err.response.data.msg);
    throw err;
  }
};
export const setOfferValue = (payload) => (dispatch) => {
  dispatch({
    type: types.SET_OFFER_DATA,
    payload,
  });
};

export const loanApplyData = (payload) => async (dispatch) => {
  dispatch({ type: types.POST_APPLY_LOAN_REQUEST });
  try {
    //console.log(payload, 'payload');
    const response = await applyLoanPost(payload);
    //console.log('response', response.data);
    dispatch({
      type: types.POST_APPLY_LOAN_SUCCESS,
      payload: response.data,
    });
    Toast.showSuccess('Loan Applied Sucessfully!');
    return response;
  } catch (err) {
    // console.log('error', err.response.data);
    dispatch({
      type: types.POST_APPLY_LOAN_FAILURE,
      payload: err.response.data,
    });
    Toast.show(err.response.data.msg);
    throw err;
  }
};
export const setApplyLoanValue = (payload) => (dispatch) => {
  dispatch({
    type: types.SET_POST_APPLY_LOAN_DATA,
    payload,
  });
};
export const clearApplyLoan = (payload) => (dispatch) => {
  dispatch({
    type: types.CLEAR_POST_APPLY_LOAN_DATA,
    payload,
  });
};
export const myRequestPostData = (payload) => async (dispatch) => {
  dispatch({ type: types.POST_MYREQUEST_REQUEST });
  try {
    // console.log(payload, 'payload');
    const response = await myrequest(payload);
    //console.log('response', response.data);
    dispatch({
      type: types.POST_MYREQUEST_SUCCESS,
      payload: response.data,
    });
    Toast.showSuccess('Request Submitted Sucessfully!');
    return response;
  } catch (err) {
    //console.log(err.response.data, 'hello');
    dispatch({
      type: types.POST_MYREQUEST_FAILURE,
      payload: err.response.data,
    });
    Toast.show(err.response.data.msg);
    throw err;
  }
};
export const setMyRequestValue = (payload) => (dispatch) => {
  dispatch({
    type: types.SET_MYREQEST_DATA,
    payload,
  });
};
export const wantedPropertyData = () => async (dispatch) => {
  dispatch({ type: types.WANTED_PROPERTIES_REQUEST });
  try {
    //console.log(payload, 'payload');
    const response = await wantedPropertyGet();
    // console.log('response', response.data.data);
    dispatch({
      type: types.WANTED_PROPERTIES_SUCCESS,
      payload: response.data,
    });
    return response;
  } catch (err) {
    dispatch({ type: types.WANTED_PROPERTIES_FAILURE, payload: err });
    Toast.show(err.response.data.msg);
    throw err;
  }
};
export const wantedPropertyDataAll = () => async (dispatch) => {
  dispatch({ type: types.WANTED_PROPERTIES_REQUEST_ALL });
  try {
    //console.log(payload, 'payload');
    const response = await wantedPropertyGetAll();
    // console.log('response', response.data.data);
    dispatch({
      type: types.WANTED_PROPERTIES_SUCCESS_ALL,
      payload: response.data,
    });
    return response;
  } catch (err) {
    dispatch({ type: types.WANTED_PROPERTIES_FAILURE_ALL, payload: err });
    Toast.show(err.response.data.msg);
    throw err;
  }
};
export const userInfoPropertyDataGet = () => async (dispatch) => {
  dispatch({ type: types.USER_INFO_PROPERTY_GET_REQUEST });
  try {
    //console.log(payload, 'payload');
    const response = await userInfoPropertyGet();
    // console.log('response', response.data.data);
    dispatch({
      type: types.USER_INFO_PROPERTY_GET_SUCCESS,
      payload: response.data,
    });
    return response;
  } catch (err) {
    dispatch({ type: types.USER_INFO_PROPERTY_GET_FAILURE, payload: err });
    Toast.show(err.response.data.msg);
    throw err;
  }
};
export const filterPropertyData = (payload) => async (dispatch) => {
  dispatch({ type: types.REQUEST_QUERY_SEARCH_DATA, payload });
  try {
    // console.log(payload, 'payload');
    const response = await searchProperty(payload);
    // console.log('response', response.data);
    dispatch({
      type: types.SUCCESS_QUERY_SEARCH_DATA,
      payload: response.data,
    });
    return response.data;
  } catch (err) {
    dispatch({ type: types.FAILURE_QUERY_SEARCH_DATA, payload: err });
    Toast.show(err.response.data.msg);
    throw err;
  }
};

export const loadMoreRequest = (payload) => async (dispatch) => {
  dispatch({ type: types.LOAD_MORE_REQUEST, payload });
  try {
    //console.log(payload, 'payload');
    const response = await searchProperty(payload);
    // console.log('response', response.data);
    dispatch({
      type: types.LOAD_MORE_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (err) {
    dispatch({ type: types.LOAD_MORE_FAILURE, payload: err });
    Toast.show(err.response.data.msg);
    throw err;
  }
};

export const detailPropertyData = (payload) => async (dispatch) => {
  dispatch({ type: types.DETAIL_PROPERTY_REQUEST, payload });
  try {
    //console.log(payload, 'payload');
    const response = await detailProperty(payload);
    //console.log('response', response.data);
    dispatch({
      type: types.DETAIL_PROPERTY_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (err) {
    dispatch({ type: types.DETAIL_PROPERTY_FAILURE, payload: err });
    Toast.show(err.response.data.msg);
    throw err;
  }
};
export const setFilterDataValue = (payload) => (dispatch) => {
  dispatch({
    type: types.SET_FILTER_DATA,
    payload,
  });
};
export const favouritePropertyDataGet = (payload) => async (dispatch) => {
  dispatch({ type: types.GET_FAVOURITE_PROPERTY_REQUEST, payload });
  try {
    //console.log(payload, 'payload');
    const response = await favouriteDataGet(payload);
    // console.log('response', response.data);
    dispatch({
      type: types.GET_FAVOURITE_PROPERTY_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (err) {
    dispatch({ type: types.GET_FAVOURITE_PROPERTY_FAILURE, payload: err });
    throw err;
  }
};
export const wishlistPropertyData = () => async (dispatch) => {
  dispatch({ type: types.WISHLIST_PROPERTY_REQUEST });
  try {
    // console.log(payload, 'payload');
    const response = await favoriteGet();
    //console.log('response', response.data);
    dispatch({
      type: types.WISHLIST_PROPERTY_SUCCESS,
      payload: response.data,
    });
    return response;
  } catch (err) {
    dispatch({ type: types.WISHLIST_PROPERTY_FAILURE, payload: err });
    Toast.show(err.response.data.msg);
    throw err;
  }
};
export const homeSlider = () => async (dispatch) => {
  dispatch({ type: types.SLIDER_GET_REQUEST });
  try {
    //console.log(payload, 'payload');
    const response = await homeSliderGet();
    // console.log(response.data, 'response\n\n');
    dispatch({ type: types.SLIDER_GET_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: types.SLIDER_GET_FAILURE, payload: err });
    throw err;
  }
};
export const bankDetailsData = (payload) => async (dispatch) => {
  dispatch({ type: types.BANK_DETAILS_REQUEST });
  try {
    // console.log(payload, 'payload');
    const response = await bankDetailsGet(payload);
    //console.log('response', response.data);
    dispatch({
      type: types.BANK_DETAILS_SUCCESS,
      payload: response.data,
    });
    return response;
  } catch (err) {
    dispatch({ type: types.BANK_DETAILS_FAILURE, payload: err });
    Toast.show(err.response.data.msg);
    throw err;
  }
};
export const myPropertyData = () => async (dispatch) => {
  dispatch({ type: types.MY_PROPERTY_REQUEST });
  try {
    // console.log(payload, 'payload');
    const response = await myPropertyGet();
    //console.log('response', response.data);
    dispatch({
      type: types.MY_PROPERTY_SUCCESS,
      payload: response.data,
    });
    return response;
  } catch (err) {
    dispatch({ type: types.MY_PROPERTY_FAILURE, payload: err });
    Toast.show(err.response.data.msg);
    throw err;
  }
};
export const favouritePropertyData = (payload) => async (dispatch) => {
  dispatch({ type: types.FAVOURITE_PROPERTY_REQUEST });
  try {
    // console.log(payload, 'payload');
    const response = await favouriteData(payload);
    //  console.log('response', response.data);
    dispatch({
      type: types.FAVOURITE_PROPERTY_SUCCESS,
      payload: response.data,
    });
    if (!payload.is_favourite) {
      Toast.showSuccess('Favourite added Sucessfully!');
    } else {
      Toast.showSuccess('Favourite removed Sucessfully!');
    }
    return response.data;
  } catch (err) {
    //  console.log('error', err.response.data);
    dispatch({
      type: types.FAVOURITE_PROPERTY_FAILURE,
      payload: err.response.data,
    });
    Toast.show(err.response.data.msg);
    throw err;
  }
};

export const postPropertyData = (payload) => async (dispatch) => {
  dispatch({ type: types.POST_PROPERTY_REQUEST });
  try {
    //console.log(payload, 'payload');
    const response = await propertyPost(payload);
    // console.log('response', response.data);
    dispatch({
      type: types.POST_PROPERTY_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (err) {
    // console.log('error', err.response.data);
    dispatch({ type: types.POST_PROPERTY_FAILURE, payload: err.response.data });
    Toast.show(err.response.data.msg);
    throw err;
  }
};
export const mediaUpload = (payload) => async (dispatch) => {
  dispatch({ type: types.MULTIPLE_PHOTO_REQUEST });
  try {
    // console.log(payload, 'payload');
    const response = await multiplePhoto(payload);
    // console.log('response', response.data);
    dispatch({
      type: types.MULTIPLE_PHOTO_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (err) {
    dispatch({ type: types.MULTIPLE_PHOTO_FAILURE, payload: err });
    throw err;
  }
};
export const clearFilterData = () => (dispatch) => {
  dispatch({
    type: types.CLEAR_FILTER_DATA,
  });
};
export const clearQueryData = () => (dispatch) => {
  dispatch({
    type: types.CLEAR_QUERY_DATA,
  });
};
export const clearPostPropertyErrorField = () => (dispatch) => {
  dispatch({
    type: types.CLEAR_POST_PROPERTY_ERRORS_FIELD,
  });
};
export const clearMyRequestField = () => (dispatch) => {
  dispatch({
    type: types.CLEAR_MAKE_PROPERTY_REQUEST_FIELD,
  });
};
export const clearMakeOfferField = () => (dispatch) => {
  dispatch({
    type: types.CLEAR_MAKE_OFFER_FIELD,
  });
};
export const clearCommentField = () => (dispatch) => {
  dispatch({
    type: types.CLEAR_COMMENT_FIELD,
  });
};
export const clearPostPropertyField = () => (dispatch) => {
  dispatch({
    type: types.CLEAR_POST_PROPERTY_FIELD,
  });
};
export const setPostPropertyValueBasic = (payload) => (dispatch) => {
  dispatch({
    type: types.SET_POST_PROPERTY_VALUE_BASIC,
    payload,
  });
};
export const setPostPropertyValueAddress = (payload) => (dispatch) => {
  dispatch({
    type: types.SET_POST_PROPERTY_VALUE_ADDRESS,
    payload,
  });
};
export const setPostPropertyValueLocationProperty = (payload) => (dispatch) => {
  dispatch({
    type: types.SET_POST_PROPERTY_VALUE_LOCATION_PROPERTY,
    payload,
  });
};
export const setPostPropertyValueBuilding = (payload) => (dispatch) => {
  dispatch({
    type: types.SET_POST_PROPERTY_VALUE_BUILDING,
    payload,
  });
};
export const setPostPropertyValueBuildingNoOf = (payload) => (dispatch) => {
  dispatch({
    type: types.SET_POST_PROPERTY_VALUE_NO_OF,
    payload,
  });
};
export const setPostPropertyValueMedia = (payload) => (dispatch) => {
  dispatch({
    type: types.SET_POST_PROPERTY_VALUE_MEDIA,
    payload,
  });
};
export const setPostPropertyValuePrice = (payload) => (dispatch) => {
  dispatch({
    type: types.SET_POST_PROPERTY_VALUE_PRICE,
    payload,
  });
};
export const setPostPropertyValueAgencyId = (payload) => (dispatch) => {
  dispatch({
    type: types.SET_POST_PROPERTY_VALUE_AGENCY_ID,
    payload,
  });
};
export const setPostPropertyValueMap = (payload) => (dispatch) => {
  dispatch({
    type: types.SET_POST_PROPERTY_VALUE_MAP,
    payload,
  });
};
export const setPostPropertyValueTags = (payload) => (dispatch) => {
  dispatch({
    type: types.SET_POST_PROPERTY_VALUE_TAGS,
    payload,
  });
};

export const clearAgencyData = (payload) => (dispatch) => {
  dispatch({
    type: types.CLEAR_AGENCY_DATA,
    payload,
  });
};

export const clearPropertyByAgency = (payload) => (dispatch) => {
  dispatch({
    type: types.CLEAR_PROPERTY_BY_AGENCY,
    payload,
  });
};

export const clearAllPropertyByAgency = (payload) => (dispatch) => {
  dispatch({
    type: types.CLEAR_ALL_PROPERTY_BY_AGENCY,
    payload,
  });
};
