import * as types from './constants';

export const setOneValue = payload => ({
  type: types.SET_ONE_VALUE,
  payload,
});
export const setSocialValue = payload => ({
  type: types.SET_SOCIAL_VALUE,
  payload,
});
export const setCodeValue = payload => ({
  type: types.SET_CODE_VALUE,
  payload,
});
export const clearCode = payload => ({
  type: types.CLEAR_CODE,
  payload,
});
export const clearOne = payload => ({
  type: types.CLEAR_ONE,
  payload,
});

export const setNewAgencyValue = payload => ({
  type: types.SET_NEW_AGENCY_VALUE,
  payload,
});

export const setNewDeveloperValue = payload => ({
  type: types.SET_NEW_DEVELOPER_VALUE,
  payload,
});

export const setNewDeveloper = payload => ({
  type: types.SET_NEW_DEVELOPER,
  payload,
});

export const setAgentValue = payload => ({
  type: types.SET_AGENT_VALUE,
  payload,
});

export const setBuilderValue = payload => ({
  type: types.SET_BUILDER_VALUE,
  payload,
});

export const setAuthorValue = payload => ({
  type: types.SET_AUTHOR_VALUE,
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
export const agentDataRequest = payload => ({
  type: types.AGENT_DATA_REQUEST,
  payload,
});
export const agentDataSuccess = payload => ({
  type: types.AGENT_DATA_SUCCESS,
  payload,
});
export const agentDataFailure = payload => ({
  type: types.AGENT_DATA_FAILURE,
  payload,
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
export const builderDataRequest = payload => ({
  type: types.BUILDER_DATA_REQUEST,
  payload,
});
export const builderDataSuccess = payload => ({
  type: types.BUILDER_DATA_SUCCESS,
  payload,
});
export const builderDataFailure = payload => ({
  type: types.BUILDER_DATA_FAILURE,
  payload,
});

export const applyAgentRequest = payload => ({
  type: types.APPLY_AGENT_REQUEST,
  payload,
});
export const applyAgentSuccess = payload => ({
  type: types.APPLY_AGENT_SUCCESS,
  payload,
});
export const applyAgentFailure = payload => ({
  type: types.APPLY_AGENT_FAILURE,
  payload,
});

export const applyBuilderRequest = payload => ({
  type: types.APPLY_BUILDER_REQUEST,
  payload,
});
export const applyBuilderSuccess = payload => ({
  type: types.APPLY_BUILDER_SUCCESS,
  payload,
});
export const applyBuilderFailure = payload => ({
  type: types.APPLY_BUILDER_FAILURE,
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

export const loadAgencyRequest = payload => ({
  type: types.LOAD_AGENCY_REQUEST,
  payload,
});
export const loadAgencySuccess = payload => ({
  type: types.LOAD_AGENCY_SUCCESS,
  payload,
});
export const loadAgencyFailure = payload => ({
  type: types.LOAD_AGENCY_FAILURE,
  payload,
});

export const loadDevelopersRequest = payload => ({
  type: types.LOAD_DEVELOPER_REQUEST,
  payload,
});
export const loadDevelopersSuccess = payload => ({
  type: types.LOAD_DEVELOPER_SUCCESS,
  payload,
});
export const loadDevelopersFailure = payload => ({
  type: types.LOAD_DEVELOPER_FAILURE,
  payload,
});
export const dashboardInfoRequest = payload => ({
  type: types.DASHBOARD_INFO_REQUEST,
  payload,
});
export const dashboardInfoSuccess = payload => ({
  type: types.DASHBOARD_INFO_SUCCESS,
  payload,
});
export const dashboardInfoFailure = payload => ({
  type: types.DASHBOARD_INFO_FAILURE,
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

export const addAgencyRequest = payload => ({
  type: types.ADD_AGENCY_REQUEST,
  payload,
});
export const addAgencySuccess = payload => ({
  type: types.ADD_AGENCY_SUCCESS,
  payload,
});
export const addAgencyFailure = payload => ({
  type: types.ADD_AGENCY_FAILURE,
  payload,
});

export const addDeveloperRequest = payload => ({
  type: types.ADD_DEVELOPER_REQUEST,
  payload,
});
export const addDeveloperSuccess = payload => ({
  type: types.ADD_DEVELOPER_SUCCESS,
  payload,
});
export const addDeveloperFailure = payload => ({
  type: types.ADD_DEVELOPER_FAILURE,
  payload,
});

export const changePasswordRequest = payload => ({
  type: types.CHANGE_PASSWORD_REQUEST,
  payload,
});
export const changePasswordSuccess = payload => ({
  type: types.CHANGE_PASSWORD_SUCCESS,
  payload,
});
export const changePasswordFailure = payload => ({
  type: types.CHANGE_PASSWORD_FAILURE,
  payload,
});

export const clearError = payload => ({
  type: types.CLEAR_ERROR,
  payload,
});
export const clearAgency = payload => ({
  type: types.CLEAR_AGENCY,
  payload,
});
export const clearDeveloper = payload => ({
  type: types.CLEAR_DEVELOPER,
  payload,
});
export const verifyEmailRequest = payload => ({
  type: types.VERIFY_EMAIL_REQUEST,
  payload,
});
export const verifyEmailSuccess = payload => ({
  type: types.VERIFY_EMAIL_SUCCESS,
  payload,
});
export const verifyEmailFailure = payload => ({
  type: types.VERIFY_EMAIL_FAILURE,
  payload,
});
export const resendCodeRequest = payload => ({
  type: types.RESEND_CODE_REQUEST,
  payload,
});
export const resendCodeSuccess = payload => ({
  type: types.RESEND_CODE_SUCCESS,
  payload,
});
export const resendCodeFailure = payload => ({
  type: types.RESEND_CODE_FAILURE,
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

export const addJourney = payload => ({
  type: types.ADD_JOURNEY,
  payload,
});
export const addFactoid = payload => ({
  type: types.ADD_FACTOID,
  payload,
});

export const setJourneyValue = payload => ({
  type: types.SET_JOURNEY_VALUE,
  payload,
});
export const setFactoidValue = payload => ({
  type: types.SET_FACTOID_VALUE,
  payload,
});

export const setOpenAgencyForm = payload => ({
  type: types.SET_OPEN_AGENCY_FORM,
  payload,
});

export const loadOfferMsgRequest = payload => ({
  type: types.LOAD_OFFER_MSG_REQUEST,
  payload,
});
export const loadOfferMsgSuccess = payload => ({
  type: types.LOAD_OFFER_MSG_SUCCESS,
  payload,
});
export const loadOfferMsgFailure = payload => ({
  type: types.LOAD_OFFER_MSG_FAILURE,
  payload,
});

export const loadNewOfferMsgRequest = payload => ({
  type: types.LOAD_NEW_OFFER_MSG_REQUEST,
  payload,
});
export const loadNewOfferMsgSuccess = payload => ({
  type: types.LOAD_NEW_OFFER_MSG_SUCCESS,
  payload,
});
export const loadNewOfferMsgFailure = payload => ({
  type: types.LOAD_NEW_OFFER_MSG_FAILURE,
  payload,
});

export const clearMessage = payload => ({
  type: types.CLEAR_MESSAGE,
  payload,
});

export const loadCategoryReportRequest = payload => ({
  type: types.LOAD_CATEGORY_REPORT_REQUEST,
  payload,
});
export const loadCategoryReportSuccess = payload => ({
  type: types.LOAD_CATEGORY_REPORT_SUCCESS,
  payload,
});
export const loadCategoryReportFailure = payload => ({
  type: types.LOAD_CATEGORY_REPORT_FAILURE,
  payload,
});

export const loadLocationReportRequest = payload => ({
  type: types.LOAD_LOCATION_REPORT_REQUEST,
  payload,
});
export const loadLocationReportSuccess = payload => ({
  type: types.LOAD_LOCATION_REPORT_SUCCESS,
  payload,
});
export const loadLocationReportFailure = payload => ({
  type: types.LOAD_LOCATION_REPORT_FAILURE,
  payload,
});

export const loadAgentReportRequest = payload => ({
  type: types.LOAD_AGENT_REPORT_REQUEST,
  payload,
});
export const loadAgentReportSuccess = payload => ({
  type: types.LOAD_AGENT_REPORT_SUCCESS,
  payload,
});
export const loadAgentReportFailure = payload => ({
  type: types.LOAD_AGENT_REPORT_FAILURE,
  payload,
});

export const loadLeadRequest = payload => ({
  type: types.LOAD_LEAD_REQUEST,
  payload,
});
export const loadLeadSuccess = payload => ({
  type: types.LOAD_LEAD_SUCCESS,
  payload,
});
export const loadLeadFailure = payload => ({
  type: types.LOAD_LEAD_FAILURE,
  payload,
});

export const setQueryValue = payload => ({
  type: types.SET_QUERY_VALUE,
  payload,
});

export const setLeadStatusRequest = payload => ({
  type: types.SET_LEAD_STATUS_REQUEST,
  payload,
});
export const setLeadStatusSuccess = payload => ({
  type: types.SET_LEAD_STATUS_SUCCESS,
  payload,
});
export const setLeadStatusFailure = payload => ({
  type: types.SET_LEAD_STATUS_FAILURE,
  payload,
});

export const setOpen = payload => ({
  type: types.SET_OPEN,
  payload,
});

export const addLeadRequest = payload => ({
  type: types.ADD_LEAD_REQUEST,
  payload,
});
export const addLeadSuccess = payload => ({
  type: types.ADD_LEAD_SUCCESS,
  payload,
});
export const addLeadFailure = payload => ({
  type: types.ADD_LEAD_FAILURE,
  payload,
});

export const setLeadOne = payload => ({
  type: types.SET_LEAD_ONE,
  payload,
});

export const loadSavedSearchesRequest = payload => ({
  type: types.LOAD_SAVED_SEARCHES_REQUEST,
  payload,
});
export const loadSavedSearchesSuccess = payload => ({
  type: types.LOAD_SAVED_SEARCHES_SUCCESS,
  payload,
});
export const loadSavedSearchesFailure = payload => ({
  type: types.LOAD_SAVED_SEARCHES_FAILURE,
  payload,
});

export const deleteSavedSearchesRequest = payload => ({
  type: types.DELETE_SAVED_SEARCHES_REQUEST,
  payload,
});
export const deleteSavedSearchesSuccess = payload => ({
  type: types.DELETE_SAVED_SEARCHES_SUCCESS,
  payload,
});
export const deleteSavedSearchesFailure = payload => ({
  type: types.DELETE_SAVED_SEARCHES_FAILURE,
  payload,
});
