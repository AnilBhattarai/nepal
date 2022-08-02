import {
  takeLatest,
  take,
  call,
  fork,
  put,
  select,
  cancel,
} from 'redux-saga/effects';
import { push, LOCATION_CHANGE } from 'connected-react-router';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import { enqueueSnackbar, setUserName, setToken } from '../App/actions';
import * as actions from './actions';
import {
  makeSelectOne,
  makeSelectAgentData,
  makeSelectAuthorData,
  makeSelectBuilderData,
  makeSelectAgency,
  makeSelectNewAgency,
  makeSelectNewDeveloper,
  makeSelectQuery,
  makeSelectLeadOne,
} from './selectors';
import { makeSelectUser } from '../App/selectors';

function* loadOne() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'user/profile',
      actions.loadOneSuccess,
      actions.loadOneFailure,
      token,
    ),
  );
}

function* loadAgency() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `agency/user?size=100`,
      actions.loadAgencySuccess,
      actions.loadAgencyFailure,
      token,
    ),
  );
}

function* loadDevelopers() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `user/developers/user`,
      actions.loadDevelopersSuccess,
      actions.loadDevelopersFailure,
      token,
    ),
  );
}

function* dashboardInfo() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `property/property/count`,
      actions.dashboardInfoSuccess,
      actions.dashboardInfoFailure,
      token,
    ),
  );
}

function* agentData() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `user/profile/agent`,
      actions.agentDataSuccess,
      actions.agentDataFailure,
      token,
    ),
  );
}

function* builderData() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `user/profile/builder`,
      actions.builderDataSuccess,
      actions.builderDataFailure,
      token,
    ),
  );
}

function* authorData() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `user/profile/author`,
      actions.authorDataSuccess,
      actions.authorDataFailure,
      token,
    ),
  );
}

function* redirectOnAgencySuccess() {
  yield take(types.ADD_AGENCY_SUCCESS);
}

function* addAgency() {
  const successWatcher = yield fork(redirectOnAgencySuccess);
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectNewAgency());
  let files = {};
  if (data.logo) {
    files = data.logo;
  }
  yield fork(
    Api.multipartPost(
      'agency',
      actions.addAgencySuccess,
      actions.addAgencyFailure,
      data,
      { file: files },
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.ADD_AGENCY_FAILURE]);
  yield cancel(successWatcher);
}

function* addAgencySuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Update success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* addAgencyFailureFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong while updating',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* redirectOnSuccess() {
  yield take(types.ADD_EDIT_SUCCESS);
  // yield put(push('/user/my-account'));
}

function* addEdit() {
  const successWatcher = yield fork(redirectOnSuccess);
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectOne());
  console.log('profule save', data);
  yield fork(
    Api.post(
      'user/profile',
      actions.addEditSuccess,
      actions.addEditFailure,
      data,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.ADD_EDIT_FAILURE]);
  yield cancel(successWatcher);
}

function* addEditSuccessful(action) {
  const defaultMsg = {
    message: action.payload.msg || 'User Profile Updated',
    options: {
      variant: 'success',
    },
  };
  const { token } = action.payload;
  if (token) {
    yield put(setToken(token));
  }
  yield put(setUserName(action.payload.data.name));
  yield put(enqueueSnackbar(defaultMsg));
}

function* addEditFailure(action) {
  const defaultMsg = {
    message: action.payload.msg || 'Input Error',
    options: {
      variant: 'warning',
    },
  };

  yield put(enqueueSnackbar(defaultMsg));
}

function* applyAgentSuccessful(action) {
  const defaultMsg = {
    message: action.payload.msg || 'Applied for agent successfully',
    options: {
      variant: 'success',
    },
  };

  yield put(enqueueSnackbar(defaultMsg));
}

function* applyAgentFail(action) {
  const defaultMsg = {
    message: action.payload.msg || 'Somthing went wrong',
    options: {
      variant: 'warning',
    },
  };

  yield put(enqueueSnackbar(defaultMsg));
}

function* applyBuilderSuccessful(action) {
  const defaultMsg = {
    message: action.payload.msg || 'Applied for builder successfully',
    options: {
      variant: 'success',
    },
  };

  yield put(enqueueSnackbar(defaultMsg));
}

function* applyBuilderFail(action) {
  const defaultMsg = {
    message: action.payload.msg || 'Somthing went wrong',
    options: {
      variant: 'warning',
    },
  };

  yield put(enqueueSnackbar(defaultMsg));
}

function* applyAuthorSuccessful(action) {
  const defaultMsg = {
    message: action.payload.msg || 'Applied for Author successfully',
    options: {
      variant: 'success',
    },
  };

  yield put(enqueueSnackbar(defaultMsg));
}

function* applyAuthorFail(action) {
  const defaultMsg = {
    message: action.payload.msg || 'Somthing went wrong',
    options: {
      variant: 'warning',
    },
  };

  yield put(enqueueSnackbar(defaultMsg));
}

function* redirectOnSuccessChangePP() {
  yield take(types.CHANGE_PASSWORD_SUCCESS);
  // yield put(logoutRequest());
}

function* changePassword(action) {
  const successWatcher = yield fork(redirectOnSuccessChangePP);

  const token = yield select(makeSelectToken());
  yield fork(
    Api.post(
      'user/changepassword',
      actions.changePasswordSuccess,
      actions.changePasswordFailure,
      action.payload,
      token,
    ),
  );

  yield take([LOCATION_CHANGE, types.CHANGE_PASSWORD_FAILURE]);
  yield cancel(successWatcher);
}

function* applyAgent() {
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectAgentData());
  yield fork(
    Api.post(
      'user/profile/agent',
      actions.applyAgentSuccess,
      actions.applyAgentFailure,
      { ...data, is_apply: true },
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.APPLY_AGENT_FAILURE]);
}

function* applyBuilder() {
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectBuilderData());
  const file = { logo: data.logo, banner: data.banner };

  console.log(data, 'DATA');
  console.log(file, 'file');

  yield fork(
    Api.multipartPost(
      'user/profile/builder',
      actions.applyBuilderSuccess,
      actions.applyBuilderFailure,
      { ...data, is_apply: true },
      file,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.APPLY_BUILDER_FAILURE]);
}

function* redirectOnDeveloperSuccess() {
  yield take(types.ADD_DEVELOPER_SUCCESS);
  // yield put(push('/admin/agency-manage'));
}

function* addDeveloper() {
  const successWatcher = yield fork(redirectOnDeveloperSuccess);
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectNewDeveloper());
  const file = { logo: data.logo, banner: data.banner };

  yield fork(
    Api.multipartPost(
      'user/profile/builder',
      actions.addDeveloperSuccess,
      actions.addDeveloperFailure,
      { ...data, is_apply: true },
      file,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.ADD_DEVELOPER_FAILURE]);
  yield cancel(successWatcher);
}

function* addDeveloperSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Update success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
  // window.location.reload();
  // yield put(actions.actionName());
  yield put(actions.builderDataRequest());
}

function* addDeveloperFailureFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong while updating',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* applyAuthor() {
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectAuthorData());
  yield fork(
    Api.post(
      'user/profile/author',
      actions.applyAuthorSuccess,
      actions.applyAuthorFailure,
      { ...data, is_apply: true },
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.APPLY_AUTHOR_FAILURE]);
}
function* redirectOnVerifySuccess() {
  yield take(types.VERIFY_EMAIL_SUCCESS);
  yield put(push('/user/profile'));
}

function* verifyEmail(action) {
  const successWatcher = yield fork(redirectOnVerifySuccess);
  const token = yield select(makeSelectToken());
  const user = yield select(makeSelectUser());
  yield fork(
    Api.post(
      `user/verifymail`,
      actions.verifyEmailSuccess,
      actions.verifyEmailFailure,
      { email: user.email, code: action.payload },
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.VERIFY_EMAIL_FAILURE]);
  yield cancel(successWatcher);
}

function* verifyEmailFailFunc(action) {
  const defaultMsg = {
    message: action.payload.msg || 'Something went wrong while verifying!!',
    options: {
      variant: 'warning',
    },
  };

  yield put(enqueueSnackbar(defaultMsg));
}

function* verifyEmailSuccFunc(action) {
  const defaultMsg = {
    message: action.payload.msg || 'Email verified successfully!!',
    options: {
      variant: 'success',
    },
  };
  window.location.reload();
  yield put(enqueueSnackbar(defaultMsg));
}

function* changepwSuccessful(action) {
  const defaultMsg = {
    message: action.payload.msg || 'password change success!!',
    options: {
      variant: 'success',
    },
  };

  yield put(enqueueSnackbar(defaultMsg));
}

function* resendCode() {
  const token = yield select(makeSelectToken());
  const user = yield select(makeSelectUser());
  yield call(
    Api.post(
      `user/verifymail/resend`,
      actions.resendCodeSuccess,
      actions.resendCodeFailure,
      { email: user.email },
      token,
    ),
  );
}

function* resendCodeSuccFunc(action) {
  const defaultMsg = {
    message: action.payload.msg || 'code resent successfully!!',
    options: {
      variant: 'success',
    },
  };

  yield put(enqueueSnackbar(defaultMsg));
}

function* resendCodeFailFunc(action) {
  const defaultMsg = {
    message: action.payload.msg || 'code resent failure!!',
    options: {
      variant: 'warning',
    },
  };

  yield put(enqueueSnackbar(defaultMsg));
}

function* addPhoto(action) {
  const token = yield select(makeSelectToken());
  // const media = yield select(makeSelectMedia());
  // console.log('add photo saga', action);
  yield call(
    Api.multipartPost(
      'user/upload/photo',
      actions.addPhotoSuccess,
      actions.addPhotoFailure,
      {},
      { file: action.payload },
      token,
    ),
  );
}

function* addPhotoSuccFunc(action) {
  const defaultMsg = {
    message: 'Profile picture updated',
    options: {
      variant: 'success',
    },
  };

  yield put(enqueueSnackbar(defaultMsg));
}

function* addPhotoFailFunc(action) {
  const defaultMsg = {
    message: 'Failed to change profile picture',
    options: {
      variant: 'warning',
    },
  };

  yield put(enqueueSnackbar(defaultMsg));
}

function* loadOfferMessages(action) {
  const token = yield select(makeSelectToken());
  let query = '';
  if (action.payload) {
    Object.keys(action.payload).map(each => {
      query = `${query}&${each}=${action.payload[each]}`;
      return null;
    });
  }
  yield call(
    Api.get(
      `property/offer/msgtouser?${query}`,
      actions.loadOfferMsgSuccess,
      actions.loadOfferMsgFailure,
      token,
    ),
  );
}

function* loadNewOfferMessages(action) {
  const token = yield select(makeSelectToken());
  let query = '';
  if (action.payload) {
    Object.keys(action.payload).map(each => {
      query = `${query}&${each}=${action.payload[each]}`;
      return null;
    });
  }
  yield call(
    Api.get(
      `property/offer/msgtouser?${query}`,
      actions.loadNewOfferMsgSuccess,
      actions.loadNewOfferMsgFailure,
      token,
    ),
  );
}

function* categoryReport() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `report/agent/property/category`,
      actions.loadCategoryReportSuccess,
      actions.loadCategoryReportFailure,
      token,
    ),
  );
}

function* locationReport() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `report/agent/property/top/area/10`,
      actions.loadLocationReportSuccess,
      actions.loadLocationReportFailure,
      token,
    ),
  );
}

function* agentReport() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `report/agent/property/top/agent`,
      actions.loadAgentReportSuccess,
      actions.loadAgentReportFailure,
      token,
    ),
  );
}

function* loadLead(action) {
  const token = yield select(makeSelectToken());
  let query = '';
  if (action.payload) {
    Object.keys(action.payload).map(each => {
      query = `${query}&${each}=${action.payload[each]}`;
      return null;
    });
  }
  yield call(
    Api.get(
      `lead/agent/lead?${query}`,
      actions.loadLeadSuccess,
      actions.loadLeadFailure,
      token,
    ),
  );
}

function* setLeadStatus(action) {
  const token = yield select(makeSelectToken());
  // const data = yield select(makeSelectOne());
  const data = action.payload;
  yield fork(
    Api.post(
      'lead/agent/lead',
      actions.setLeadStatusSuccess,
      actions.setLeadStatusFailure,
      data,
      token,
    ),
  );
}

function* setLeadStatusSuccessFunc(action) {
  const query = yield select(makeSelectQuery());
  const snackbarData = {
    message: 'Status Changed',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
  yield put(actions.loadLeadRequest(query));
}

function* setLeadStatusFailureFunc(action) {
  const snackbarData = {
    message: 'Something went wrong while updating',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* redirectOnLeadSuccess() {
  yield take(types.ADD_LEAD_SUCCESS);
  yield put(push('/user/leads'));
}

function* addLead() {
  const successWatcher = yield fork(redirectOnLeadSuccess);
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectLeadOne());
  yield fork(
    Api.post(
      'lead/agent',
      actions.addLeadSuccess,
      actions.addLeadFailure,
      data,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.ADD_LEAD_FAILURE]);
  yield cancel(successWatcher);
}

function* addLeadSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Update success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* addLeadFailureFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong while updating',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* loadSavedSearches() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'search-filter',
      actions.loadSavedSearchesSuccess,
      actions.loadSavedSearchesFailure,
      token,
    ),
  );
}

function* deleteSavedSearches(action) {
  const token = yield select(makeSelectToken());
  yield fork(
    Api.delete(
      `search-filter/${action.payload}`,
      actions.deleteSavedSearchesSuccess,
      actions.deleteSavedSearchesFailure,
      token,
    ),
  );
}

function* deleteSavedSearchesSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Delete success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* deleteSavedSearchesFailureFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong while deleting',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

export default function* userPersonalInformationPageSaga() {
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.AGENT_DATA_REQUEST, agentData);
  yield takeLatest(types.APPLY_AGENT_REQUEST, applyAgent);
  yield takeLatest(types.APPLY_AGENT_SUCCESS, applyAgentSuccessful);
  yield takeLatest(types.APPLY_AGENT_FAILURE, applyAgentFail);
  yield takeLatest(types.LOAD_AGENCY_REQUEST, loadAgency);
  yield takeLatest(types.LOAD_DEVELOPER_REQUEST, loadDevelopers);
  yield takeLatest(types.DASHBOARD_INFO_REQUEST, dashboardInfo);
  yield takeLatest(types.ADD_PHOTO_REQUEST, addPhoto);
  yield takeLatest(types.ADD_PHOTO_SUCCESS, addPhotoSuccFunc);
  yield takeLatest(types.ADD_PHOTO_FAILURE, addPhotoFailFunc);

  yield takeLatest(types.BUILDER_DATA_REQUEST, builderData);
  yield takeLatest(types.APPLY_BUILDER_REQUEST, applyBuilder);
  yield takeLatest(types.APPLY_BUILDER_SUCCESS, applyBuilderSuccessful);
  yield takeLatest(types.APPLY_BUILDER_FAILURE, applyBuilderFail);

  yield takeLatest(types.AUTHOR_DATA_REQUEST, authorData);
  yield takeLatest(types.APPLY_AUTHOR_REQUEST, applyAuthor);
  yield takeLatest(types.APPLY_AUTHOR_SUCCESS, applyAuthorSuccessful);
  yield takeLatest(types.APPLY_AUTHOR_FAILURE, applyAuthorFail);

  yield takeLatest(types.VERIFY_EMAIL_REQUEST, verifyEmail);
  yield takeLatest(types.VERIFY_EMAIL_FAILURE, verifyEmailFailFunc);
  yield takeLatest(types.VERIFY_EMAIL_SUCCESS, verifyEmailSuccFunc);
  yield takeLatest(types.ADD_EDIT_REQUEST, addEdit);
  yield takeLatest(types.ADD_EDIT_SUCCESS, addEditSuccessful);
  yield takeLatest(types.ADD_EDIT_FAILURE, addEditFailure);

  yield takeLatest(types.ADD_AGENCY_REQUEST, addAgency);
  yield takeLatest(types.ADD_AGENCY_SUCCESS, addAgencySuccessFunc);
  yield takeLatest(types.ADD_AGENCY_FAILURE, addAgencyFailureFunc);
  yield takeLatest(types.CHANGE_PASSWORD_REQUEST, changePassword);
  yield takeLatest(types.CHANGE_PASSWORD_SUCCESS, changepwSuccessful);
  yield takeLatest(types.RESEND_CODE_REQUEST, resendCode);
  yield takeLatest(types.RESEND_CODE_SUCCESS, resendCodeSuccFunc);
  yield takeLatest(types.RESEND_CODE_FAILURE, resendCodeFailFunc);

  yield takeLatest(types.ADD_DEVELOPER_REQUEST, addDeveloper);
  yield takeLatest(types.ADD_DEVELOPER_SUCCESS, addDeveloperSuccessFunc);
  yield takeLatest(types.ADD_DEVELOPER_FAILURE, addDeveloperFailureFunc);

  yield takeLatest(types.LOAD_OFFER_MSG_REQUEST, loadOfferMessages);
  yield takeLatest(types.LOAD_NEW_OFFER_MSG_REQUEST, loadNewOfferMessages);

  yield takeLatest(types.LOAD_CATEGORY_REPORT_REQUEST, categoryReport);
  yield takeLatest(types.LOAD_LOCATION_REPORT_REQUEST, locationReport);
  yield takeLatest(types.LOAD_AGENT_REPORT_REQUEST, agentReport);
  yield takeLatest(types.LOAD_LEAD_REQUEST, loadLead);

  yield takeLatest(types.SET_LEAD_STATUS_REQUEST, setLeadStatus);
  yield takeLatest(types.SET_LEAD_STATUS_SUCCESS, setLeadStatusSuccessFunc);
  yield takeLatest(types.SET_LEAD_STATUS_FAILURE, setLeadStatusFailureFunc);

  yield takeLatest(types.ADD_LEAD_REQUEST, addLead);
  yield takeLatest(types.ADD_LEAD_SUCCESS, addLeadSuccessFunc);
  yield takeLatest(types.ADD_LEAD_FAILURE, addLeadFailureFunc);

  yield takeLatest(types.LOAD_SAVED_SEARCHES_REQUEST, loadSavedSearches);

  yield takeLatest(types.DELETE_SAVED_SEARCHES_REQUEST, deleteSavedSearches);
  yield takeLatest(
    types.DELETE_SAVED_SEARCHES_SUCCESS,
    deleteSavedSearchesSuccessFunc,
  );
  yield takeLatest(
    types.DELETE_SAVED_SEARCHES_FAILURE,
    deleteSavedSearchesFailureFunc,
  );
}
