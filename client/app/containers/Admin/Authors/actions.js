import * as types from './constants';

export const setQueryValue = payload => ({
  type: types.SET_QUERY_VALUE,
  payload,
});
export const setQueryObj = payload => ({
  type: types.SET_QUERY_OBJ,
  payload,
});
export const clearQuery = payload => ({
  type: types.CLEAR_QUERY,
  payload,
});

export const loadAllRequest = payload => ({
  type: types.LOAD_ALL_REQUEST,
  payload,
});
export const loadAllSuccess = payload => ({
  type: types.LOAD_ALL_SUCCESS,
  payload,
});
export const loadAllFailure = payload => ({
  type: types.LOAD_ALL_FAILURE,
  payload,
});

export const clearErrors = () => ({
  type: types.CLEAR_ERRORS,
});

export const authorDataRequest = payload => ({
  type: types.AUTHOR_DATA_REQUEST,
  payload,
});
export const authorDataSuccess = payload => ({
  type: types.AUTHOR_DATA_SUCCESS,
  payload,
});
export const authorDataFailure = payload => ({
  type: types.AUTHOR_DATA_FAILURE,
  payload,
});

export const applyAuthorRequest = payload => ({
  type: types.APPLY_AUTHOR_REQUEST,
  payload,
});
export const applyAuthorSuccess = payload => ({
  type: types.APPLY_AUTHOR_SUCCESS,
  payload,
});
export const applyAuthorFailure = payload => ({
  type: types.APPLY_AUTHOR_FAILURE,
  payload,
});

export const setAuthorValue = payload => ({
  type: types.SET_AUTHOR_VALUE,
  payload,
});

export const setSocialLinkValue = payload => ({
  type: types.SET_SOCIAL_LINK_VALUE,
  payload,
});

export const setOneValue = payload => ({
  type: types.SET_ONE_VALUE,
  payload,
});

export const addPhotoRequest = payload => ({
  type: types.ADD_PHOTO_REQUEST,
  payload,
});
export const addPhotoSuccess = payload => ({
  type: types.ADD_PHOTO_SUCCESS,
  payload,
});
export const addPhotoFailure = payload => ({
  type: types.ADD_PHOTO_FAILURE,
  payload,
});
