import * as types from './constants';

export const setOneValue = payload => ({
  type: types.SET_ONE_VALUE,
  payload,
});
export const clearOne = payload => ({
  type: types.CLEAR_ONE,
  payload,
});

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

export const loadOneRequest = payload => ({
  type: types.LOAD_ONE_REQUEST,
  payload,
});
export const loadOneSuccess = payload => ({
  type: types.LOAD_ONE_SUCCESS,
  payload,
});
export const loadOneFailure = payload => ({
  type: types.LOAD_ONE_FAILURE,
  payload,
});
export const loadMediaRequest = payload => ({
  type: types.LOAD_MEDIA_REQUEST,
  payload,
});
export const loadMediaSuccess = payload => ({
  type: types.LOAD_MEDIA_SUCCESS,
  payload,
});
export const loadMediaFailure = payload => ({
  type: types.LOAD_MEDIA_FAILURE,
  payload,
});

export const addEditRequest = payload => ({
  type: types.ADD_EDIT_REQUEST,
  payload,
});
export const addEditSuccess = payload => ({
  type: types.ADD_EDIT_SUCCESS,
  payload,
});
export const addEditFailure = payload => ({
  type: types.ADD_EDIT_FAILURE,
  payload,
});

export const deleteOneRequest = payload => ({
  type: types.DELETE_ONE_REQUEST,
  payload,
});
export const deleteOneSuccess = payload => ({
  type: types.DELETE_ONE_SUCCESS,
  payload,
});
export const deleteOneFailure = payload => ({
  type: types.DELETE_ONE_FAILURE,
  payload,
});
export const clearErrors = payload => ({
  type: types.CLEAR_ERRORS,
  payload,
});

export const setSingleRequirement = payload => ({
  type: types.SET_SINGLE_REQUIREMENT,
  payload,
});

export const setSingleValue = payload => ({
  type: types.SET_SINGLE_VALUE,
  payload,
});

export const addFromMedia = payload => ({
  type: types.ADD_FROM_MEDIA,
  payload,
});

export const setChosenIndex = payload => ({
  type: types.SET_CHOSEN_INDEX,
  payload,
});

export const addRequirement = payload => ({
  type: types.ADD_REQUIREMENT,
  payload,
});

export const removeRequirement = payload => ({
  type: types.REMOVE_REQUIREMENT,
  payload,
});

export const addChosenPopup = payload => ({
  type: types.ADD_CHOSEN_POPUP,
  payload,
});

export const addAllChosenPopup = payload => ({
  type: types.ADD_ALL_CHOSEN_POPUP,
  payload,
});

export const clearChosenPopup = payload => ({
  type: types.CLEAR_CHOSEN_POPUP,
  payload,
});

export const deleteMultiplePopupRequest = payload => ({
  type: types.DELETE_MULTIPLE_POPUP_REQUEST,
  payload,
});
export const deleteMultiplePopupSuccess = payload => ({
  type: types.DELETE_MULTIPLE_POPUP_SUCCESS,
  payload,
});
export const deleteMultiplePopupFailure = payload => ({
  type: types.DELETE_MULTIPLE_POPUP_FAILURE,
  payload,
});

export const activeAllPopupRequest = payload => ({
  type: types.ACTIVE_ALL_POPUP_REQUEST,
  payload,
});
export const activeAllPopupSuccess = payload => ({
  type: types.ACTIVE_ALL_POPUP_SUCCESS,
  payload,
});
export const activeAllPopupFailure = payload => ({
  type: types.ACTIVE_ALL_POPUP_FAILURE,
  payload,
});
