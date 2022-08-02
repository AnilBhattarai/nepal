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
import { makeSelectToken } from '../../App/selectors';
import { enqueueSnackbar } from '../../App/actions';
import * as types from './constants';
import * as actions from './actions';
import {
  makeSelectOne,
  makeSelectAgentData,
  makeSelectAuthorData,
  makeSelectBuilderData,
} from './selectors';

function* loadAll(action) {
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
      `user?${query}`,
      actions.loadAllSuccess,
      actions.loadAllFailure,
      token,
    ),
  );
}

function* loadOne(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `user/detail/${action.payload}`,
      actions.loadOneSuccess,
      actions.loadOneFailure,
      token,
    ),
  );
}

function* loadAllRoles() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `role/role?is_active=true`,
      actions.loadAllRolesSuccess,
      actions.loadAllRolesFailure,
      token,
    ),
  );
}

function* redirectOnSuccess(goBack) {
  const action = yield take(types.ADD_EDIT_SUCCESS);
  const defaultMsg = {
    message: (action.payload && action.payload.msg) || 'save success',
    options: {
      variant: 'success',
    },
  };

  yield put(enqueueSnackbar(defaultMsg));
  goBack();
}

function* redirectOnPwReset() {
  yield take(types.UPDATE_PASSWORD_SUCCESS);
  yield put(push('/admin/user-manage'));
}

function* addEdit({ payload }) {
  const successWatcher = yield fork(redirectOnSuccess, payload);
  const token = yield select(makeSelectToken());
  const { users } = yield select(makeSelectOne());
  yield fork(
    Api.post(
      'user/change',
      actions.addEditSuccess,
      actions.addEditFailure,
      users,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.ADD_EDIT_FAILURE]);
  yield cancel(successWatcher);
}

function* updatePassword() {
  const successWatcher = yield fork(redirectOnPwReset);
  const token = yield select(makeSelectToken());
  const { users } = yield select(makeSelectOne());
  yield fork(
    Api.post(
      'user/changepw',
      actions.updatePasswordSuccess,
      actions.updatePasswordFailure,
      users,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.UPDATE_PASSWORD_FAILURE]);
  yield cancel(successWatcher);
}

function* addEditFail(action) {
  const defaultError = {
    message: action.payload.msg || 'something went wrong',
    options: {
      variant: 'warning',
    },
  };

  yield put(enqueueSnackbar(defaultError));
}

// function* addEditSuccessFunc(action) {
//   const snackbarData = {
//     message: action.payload.msg || 'update success!!',
//     options: {
//       variant: 'success',
//     },
//   };
//   yield put(enqueueSnackbar(snackbarData));
// }

function* updateFail(action) {
  const defaultError = {
    message: action.payload.msg || 'something went wrong',
    options: {
      variant: 'warning',
    },
  };

  yield put(enqueueSnackbar(defaultError));
}

function* updateSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'password update success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
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

function* applyAgent(action) {
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectAgentData());
  yield fork(
    Api.post(
      'user/agent/verify',
      actions.applyAgentSuccess,
      actions.applyAgentFailure,
      { ...data, 
      _id: action.payload.id, 
      name: action.payload.name, 
      email: action.payload.email, 
       },
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.APPLY_AGENT_FAILURE]);
}

function* applyBuilder(action) {
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectBuilderData());
  yield fork(
    Api.post(
      'user/builder/verify',
      actions.applyBuilderSuccess,
      actions.applyBuilderFailure,
      { ...data, 
      _id: action.payload.id, 
      name: action.payload.name, 
      email: action.payload.email, 
       },
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.APPLY_BUILDER_FAILURE]);
}

function* applyAuthor(action) {
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectAuthorData());
  yield fork(
    Api.post(
      'user/author/verify',
      actions.applyAuthorSuccess,
      actions.applyAuthorFailure,
      { ...data, 
      _id: action.payload.id, 
      name: action.payload.name, 
      email: action.payload.email, 
       },
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.APPLY_AUTHOR_FAILURE]);
}

function* loadAgency() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `agency?page=0`,
      actions.loadAgencySuccess,
      actions.loadAgencyFailure,
      token,
    ),
  );
}

export default function* adminUserManagePageSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
  yield takeLatest(types.LOAD_ALL_ROLES_REQUEST, loadAllRoles);
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.ADD_EDIT_REQUEST, addEdit);
  yield takeLatest(types.UPDATE_PASSWORD_REQUEST, updatePassword);
  yield takeLatest(types.ADD_EDIT_FAILURE, addEditFail);
  yield takeLatest(types.UPDATE_PASSWORD_FAILURE, updateFail);
  yield takeLatest(types.UPDATE_PASSWORD_SUCCESS, updateSuccessFunc);

  yield takeLatest(types.AGENT_DATA_REQUEST, agentData);
  yield takeLatest(types.APPLY_AGENT_REQUEST, applyAgent);
  yield takeLatest(types.APPLY_AGENT_SUCCESS, applyAgentSuccessful);
  yield takeLatest(types.APPLY_AGENT_FAILURE, applyAgentFail);

  yield takeLatest(types.BUILDER_DATA_REQUEST, builderData);
  yield takeLatest(types.APPLY_BUILDER_REQUEST, applyBuilder);
  yield takeLatest(types.APPLY_BUILDER_SUCCESS, applyBuilderSuccessful);
  yield takeLatest(types.APPLY_BUILDER_FAILURE, applyBuilderFail);
  yield takeLatest(types.LOAD_AGENCY_REQUEST, loadAgency);

  yield takeLatest(types.AUTHOR_DATA_REQUEST, authorData);
  yield takeLatest(types.APPLY_AUTHOR_REQUEST, applyAuthor);
  yield takeLatest(types.APPLY_AUTHOR_SUCCESS, applyAuthorSuccessful);
  yield takeLatest(types.APPLY_AUTHOR_FAILURE, applyAuthorFail);
}
