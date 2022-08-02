import {
  takeLatest,
  call,
  select,
  fork,
  take,
  put,
  cancel,
} from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'connected-react-router';
import Api from '../../../utils/Api';
import { makeSelectToken } from '../../App/selectors';
import * as types from './constants';
import * as actions from './actions';
import { makeSelectOne, makeSelectQuery } from './selectors';
import { enqueueSnackbar } from '../../App/actions';

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
      `lead?${query}`,
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
      `lead/${action.payload}`,
      actions.loadOneSuccess,
      actions.loadOneFailure,
      token,
    ),
  );
}

function* redirectOnSuccess() {
  yield take(types.ADD_EDIT_SUCCESS);
  yield put(push('/admin/lead-manage'));
}

function* addEdit() {
  const successWatcher = yield fork(redirectOnSuccess);
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectOne());
  yield fork(
    Api.post(
      'lead',
      actions.addEditSuccess,
      actions.addEditFailure,
      data,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.ADD_EDIT_FAILURE]);
  yield cancel(successWatcher);
}

function* deleteOne(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.delete(
      `lead/${action.payload}`,
      actions.deleteOneSuccess,
      actions.deleteOneFailure,
      token,
    ),
  );
}

function* deleteSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Service type delete success',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* deleteFailureFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong while deleting!!',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* addEditSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Update success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* addEditFailureFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong while updating',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* loadAgency(action) {
  const token = yield select(makeSelectToken());

  yield call(
    Api.get(
      'agency/getall/dropdown',
      actions.loadAgencySuccess,
      actions.loadAgencyFailure,
      token,
    ),
  );
}

function* loadAgentsByAgency(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `agency/getAgentOfAgency/${action.payload}`,
      actions.loadAgentByAgencySuccess,
      actions.loadAgentByAgencyFailure,
      token,
    ),
  );
}

function* assignAgent(action) {
  const token = yield select(makeSelectToken());
  // const data = yield select(makeSelectOne());
  const data = action.payload;
  yield fork(
    Api.post(
      'lead/assigntoagent',
      actions.AssignAgentSuccess,
      actions.AssignAgentFailure,
      data,
      token,
    ),
  );
}

function* assignAgentSuccessFunc(action) {
  const query = yield select(makeSelectQuery());
  const snackbarData = {
    message: 'Agent Asigned',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
  yield put(actions.loadAllRequest(query));
}

function* assignAgentFailureFunc(action) {
  const snackbarData = {
    message: 'Something went wrong while updating',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

// Individual exports for testing
export default function* leadManageSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.ADD_EDIT_REQUEST, addEdit);
  yield takeLatest(types.DELETE_ONE_REQUEST, deleteOne);
  yield takeLatest(types.DELETE_ONE_SUCCESS, deleteSuccessFunc);
  yield takeLatest(types.DELETE_ONE_FAILURE, deleteFailureFunc);
  yield takeLatest(types.ADD_EDIT_FAILURE, addEditFailureFunc);
  yield takeLatest(types.ADD_EDIT_SUCCESS, addEditSuccessFunc);
  yield takeLatest(types.LOAD_AGENY_REQUEST, loadAgency);

  yield takeLatest(types.LOAD_AGENT_BY_AGENCY_REQUEST, loadAgentsByAgency);

  yield takeLatest(types.ASSIGN_AGENT_REQUEST, assignAgent);
  yield takeLatest(types.ASSIGN_AGENT_SUCCESS, assignAgentSuccessFunc);
  yield takeLatest(types.ASSIGN_AGENT_FAILURE, assignAgentFailureFunc);
}
