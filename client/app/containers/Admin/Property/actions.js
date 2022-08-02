/*
 *
 * Property actions
 *
 */

import * as types from './constants';

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

export const setOneValue = payload => ({
  type: types.SET_ONE_VALUE,
  payload,
});

export const setCaption = payload => ({
  type: types.SET_CAPTION,
  payload,
});
export const setFloorPlanCaption = payload => ({
  type: types.SET_FLOOR_PLAN_CAPTION,
  payload,
});
export const setPaymentPlanCaption = payload => ({
  type: types.SET_PAYMENT_PLAN_CAPTION,
  payload,
});
export const setTempAddress = payload => ({
  type: types.SET_TEMP_ADDRESS,
  payload,
});
export const setBuildingValue = payload => ({
  type: types.SET_BUILDING_VALUE,
  payload,
});
export const setDescriptionValue = payload => ({
  type: types.SET_DESCRIPTION_VALUE,
  payload,
});
export const setLocationValue = payload => ({
  type: types.SET_LOCATION_VALUE,
  payload,
});
export const setMediaValue = payload => ({
  type: types.SET_MEDIA_VALUE,
  payload,
});
export const clearOne = () => ({
  type: types.CLEAR_ONE,
});
export const clearFilter = () => ({
  type: types.CLEAR_FILTER,
});
export const setQueryValue = payload => ({
  type: types.SET_QUERY_VALUE,
  payload,
});
export const setInitialQueryValue = payload => ({
  type: types.SET_INITIAL_QUERY_VALUE,
  payload,
});
export const setFilterValue = payload => ({
  type: types.SET_FILTER_VALUE,
  payload,
});
export const setIsLand = payload => ({
  type: types.SET_IS_LAND,
  payload,
});
export const setIsProject = payload => ({
  type: types.SET_IS_PROJECT,
  payload,
});

export const clearQuery = () => ({
  type: types.CLEAR_QUERY,
});
export const clearErrors = () => ({
  type: types.CLEAR_ERRORS,
});

export const loadEnumRequest = payload => ({
  type: types.LOAD_ENUM_REQUEST,
  payload,
});
export const loadEnumSuccess = payload => ({
  type: types.LOAD_ENUM_SUCCESS,
  payload,
});
export const loadEnumFailure = payload => ({
  type: types.LOAD_ENUM_FAILURE,
  payload,
});
export const loadLocationRequest = payload => ({
  type: types.LOAD_LOCATION_REQUEST,
  payload,
});
export const loadLocationSuccess = payload => ({
  type: types.LOAD_LOCATION_SUCCESS,
  payload,
});
export const loadLocationFailure = payload => ({
  type: types.LOAD_LOCATION_FAILURE,
  payload,
});
export const loadStateRequest = payload => ({
  type: types.LOAD_STATE_REQUEST,
  payload,
});
export const loadStateSuccess = payload => ({
  type: types.LOAD_STATE_SUCCESS,
  payload,
});
export const loadStateFailure = payload => ({
  type: types.LOAD_STATE_FAILURE,
  payload,
});
export const loadDistrictRequest = payload => ({
  type: types.LOAD_DISTRICT_REQUEST,
  payload,
});
export const loadDistrictSuccess = payload => ({
  type: types.LOAD_DISTRICT_SUCCESS,
  payload,
});
export const loadDistrictFailure = payload => ({
  type: types.LOAD_DISTRICT_FAILURE,
  payload,
});
export const loadMunicipalityRequest = payload => ({
  type: types.LOAD_MUNICIPALITY_REQUEST,
  payload,
});
export const loadMunicipalitySuccess = payload => ({
  type: types.LOAD_MUNICIPALITY_SUCCESS,
  payload,
});
export const loadMunicipalityFailure = payload => ({
  type: types.LOAD_MUNICIPALITY_FAILURE,
  payload,
});
export const loadAreaRequest = payload => ({
  type: types.LOAD_AREA_REQUEST,
  payload,
});
export const loadAreaSuccess = payload => ({
  type: types.LOAD_AREA_SUCCESS,
  payload,
});
export const loadAreaFailure = payload => ({
  type: types.LOAD_AREA_FAILURE,
  payload,
});
export const setTagValue = payload => ({
  type: types.SET_TAG_VALUE,
  payload,
});
export const addMediaRequest = payload => ({
  type: types.ADD_MEDIA_REQUEST,
  payload,
});
export const addMediaSuccess = payload => ({
  type: types.ADD_MEDIA_SUCCESS,
  payload,
});
export const addMediaFailure = payload => ({
  type: types.ADD_MEDIA_FAILURE,
  payload,
});
export const deleteMediaRequest = payload => ({
  type: types.DELETE_MEDIA_REQUEST,
  payload,
});
export const deleteMediaSuccess = payload => ({
  type: types.DELETE_MEDIA_SUCCESS,
  payload,
});
export const deleteMediaFailure = payload => ({
  type: types.DELETE_MEDIA_FAILURE,
  payload,
});
export const addPaymentPlanRequest = payload => ({
  type: types.ADD_PAYMENT_PLAN_REQUEST,
  payload,
});
export const addPaymentPlanSuccess = payload => ({
  type: types.ADD_PAYMENT_PLAN_SUCCESS,
  payload,
});
export const addPaymentPlanFailure = payload => ({
  type: types.ADD_PAYMENT_PLAN_FAILURE,
  payload,
});
export const deletePaymentPlanRequest = payload => ({
  type: types.DELETE_PAYMENT_PLAN_REQUEST,
  payload,
});
export const deletePaymentPlanSuccess = payload => ({
  type: types.DELETE_PAYMENT_PLAN_SUCCESS,
  payload,
});
export const deletePaymentPlanFailure = payload => ({
  type: types.DELETE_PAYMENT_PLAN_FAILURE,
  payload,
});
export const addFloorPlanRequest = payload => ({
  type: types.ADD_FLOOR_PLAN_REQUEST,
  payload,
});
export const addFloorPlanSuccess = payload => ({
  type: types.ADD_FLOOR_PLAN_SUCCESS,
  payload,
});
export const addFloorPlanFailure = payload => ({
  type: types.ADD_FLOOR_PLAN_FAILURE,
  payload,
});
export const deleteFloorPlanRequest = payload => ({
  type: types.DELETE_FLOOR_PLAN_REQUEST,
  payload,
});
export const deleteFloorPlanSuccess = payload => ({
  type: types.DELETE_FLOOR_PLAN_SUCCESS,
  payload,
});
export const deleteFloorPlanFailure = payload => ({
  type: types.DELETE_FLOOR_PLAN_FAILURE,
  payload,
});
export const loadAgentsRequest = payload => ({
  type: types.LOAD_AGENTS_REQUEST,
  payload,
});
export const loadAgentsSuccess = payload => ({
  type: types.LOAD_AGENTS_SUCCESS,
  payload,
});
export const loadAgentsFailure = payload => ({
  type: types.LOAD_AGENTS_FAILURE,
  payload,
});
export const loadUserStatusRequest = payload => ({
  type: types.LOAD_USER_STATUS_REQUEST,
  payload,
});
export const loadUserStatusSuccess = payload => ({
  type: types.LOAD_USER_STATUS_SUCCESS,
  payload,
});
export const loadUserStatusFailure = payload => ({
  type: types.LOAD_USER_STATUS_FAILURE,
  payload,
});

export const addProjectFeatureRequest = payload => ({
  type: types.ADD_PROJECT_FEATURE_REQUEST,
  payload,
});
export const addProjectFeatureSuccess = payload => ({
  type: types.ADD_PROJECT_FEATURE_SUCCESS,
  payload,
});
export const addProjectFeatureFailure = payload => ({
  type: types.ADD_PROJECT_FEATURE_FAILURE,
  payload,
});
export const deleteProjectFeatureRequest = payload => ({
  type: types.DELETE_PROJECT_FEATURE_REQUEST,
  payload,
});
export const deleteProjectFeatureSuccess = payload => ({
  type: types.DELETE_PROJECT_FEATURE_SUCCESS,
  payload,
});
export const deleteProjectFeatureFailure = payload => ({
  type: types.DELETE_PROJECT_FEATURE_FAILURE,
  payload,
});
export const setProjectFeature = payload => ({
  type: types.SET_PROJECT_FEATURE,
  payload,
});
export const setProjectValue = payload => ({
  type: types.SET_PROJECT_VALUE,
  payload,
});
export const addProjectTypeRequest = payload => ({
  type: types.ADD_PROJECT_TYPE_REQUEST,
  payload,
});
export const deleteProjectTypeRequest = payload => ({
  type: types.DELETE_PROJECT_TYPE_REQUEST,
  payload,
});
export const setProjectType = payload => ({
  type: types.SET_PROJECT_TYPE,
  payload,
});
export const setProjectArea = payload => ({
  type: types.SET_PROJECT_AREA,
  payload,
});
export const setProjectPrice = payload => ({
  type: types.SET_PROJECT_PRICE,
  payload,
});
export const loadDevelopersRequest = payload => ({
  type: types.LOAD_DEVELOPERS_REQUEST,
  payload,
});
export const loadDevelopersSuccess = payload => ({
  type: types.LOAD_DEVELOPERS_SUCCESS,
  payload,
});
export const loadDevelopersFailure = payload => ({
  type: types.LOAD_DEVELOPERS_FAILURE,
  payload,
});
export const addProjectImageRequest = payload => ({
  type: types.ADD_PROJECT_TYPE_IMAGE_REQUEST,
  payload,
});
export const addProjectImageSuccess = payload => ({
  type: types.ADD_PROJECT_TYPE_IMAGE_SUCCESS,
  payload,
});
export const addProjectImageFailure = payload => ({
  type: types.ADD_PROJECT_TYPE_IMAGE_FAILURE,
  payload,
});

export const deleteProjectImageRequest = payload => ({
  type: types.DELETE_PROJECT_TYPE_IMAGE_REQUEST,
  payload,
});
export const deleteProjectImageSuccess = payload => ({
  type: types.DELETE_PROJECT_TYPE_IMAGE_SUCCESS,
  payload,
});
export const deleteProjectImageFailure = payload => ({
  type: types.DELETE_PROJECT_TYPE_IMAGE_FAILURE,
  payload,
});

export const loadAgentsByAgencyRequest = payload => ({
  type: types.LOAD_AGENTS_BY_AGENCY_REQUEST,
  payload,
});
export const loadAgentsByAgencySuccess = payload => ({
  type: types.LOAD_AGENTS_BY_AGENCY_SUCCESS,
  payload,
});
export const loadAgentsByAgencyFailure = payload => ({
  type: types.LOAD_AGENTS_BY_AGENCY_FAILURE,
  payload,
});

export const addProjectTypeFloor = payload => ({
  type: types.ADD_PROJECT_TYPE_FLOOR,
  payload,
});

export const deleteProjectTypeFloor = payload => ({
  type: types.DELETE_PROJECT_TYPE_FLOOR,
  payload,
});
export const deleteProjectTypeFeatureList = payload => ({
  type: types.DELETE_PROJECT_TYPE_FEATURE_LIST,
  payload,
});
export const deleteProjectTypeFloorImage = payload => ({
  type: types.DELETE_PROJECT_TYPE_FLOOR_IMAGE,
  payload,
});

export const setProjectTypeFloor = payload => ({
  type: types.SET_PROJECT_TYPE_FLOOR,
  payload,
});

export const addProjectFloorImageRequest = payload => ({
  type: types.ADD_PROJECT_TYPE_FLOOR_IMAGE_REQUEST,
  payload,
});
export const addProjectFloorImageSuccess = payload => ({
  type: types.ADD_PROJECT_TYPE_FLOOR_IMAGE_SUCCESS,
  payload,
});
export const addProjectFloorImageFailure = payload => ({
  type: types.ADD_PROJECT_TYPE_FLOOR_IMAGE_FAILURE,
  payload,
});

export const addProjectTypeFloorFeature = payload => ({
  type: types.ADD_PROJECT_TYPE_FLOOR_FEATURE,
  payload,
});

export const setProjectTypeFloorFeature = payload => ({
  type: types.SET_PROJECT_TYPE_FLOOR_FEATURE,
  payload,
});

export const clearProjectType = payload => ({
  type: types.CLEAR_PROJECT_TYPE,
  payload,
});

export const setIsBack = payload => ({
  type: types.SET_IS_BACK,
  payload,
});

export const autoSaveRequest = payload => ({
  type: types.AUTO_SAVE_REQUEST,
  payload,
});
export const autoSaveSuccess = payload => ({
  type: types.AUTO_SAVE_SUCCESS,
  payload,
});
export const autoSaveFailure = payload => ({
  type: types.AUTO_SAVE_FAILURE,
  payload,
});
