import {
  take,
  call,
  takeLatest,
  put,
  select,
  cancel,
  fork,
} from 'redux-saga/effects';
import { push, LOCATION_CHANGE } from 'connected-react-router';
import { makeSelectToken } from '../../App/selectors';
import Api from '../../../utils/Api';
import * as types from './constants';
import * as actions from './actions';
import { makeSelectOne } from './selectors';
import { enqueueSnackbar } from '../../App/actions';

function* loadAll(action) {
  const token = yield select(makeSelectToken());
  // console.log('action.payload', action.payload);
  // const districtID = action.payload.districtId;
  // console.log('districtID', districtID);
  let query = '';

  if (action.payload) {
    Object.keys(action.payload).map(each => {
      query = `${query}&${each}=${action.payload[each]}`;
      return null;
    });
  }

  yield call(
    Api.get(
      `static/nepal/vdc?${query}`,
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
      `static/nepal/vdc/${action.payload}`,
      actions.loadOneSuccess,
      actions.loadOneFailure,
      token,
    ),
  );
}

function* redirectOnSuccess() {
  yield take(types.ADD_EDIT_SUCCESS);
  yield put(push('/admin/vdc-manage'));
}

function* addEdit() {
  const successWatcher = yield fork(redirectOnSuccess);
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectOne());

  yield fork(
    Api.post(
      'static/nepal/vdc',
      actions.addEditSuccess,
      actions.addEditFailure,
      data,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.ADD_EDIT_FAILURE]);
  yield cancel(successWatcher);
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
    message: action.payload.msg || 'Something went wrong',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* deleteVdc(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.post(
      `static/nepal/vdc`,
      actions.deleteOneSuccess,
      actions.deleteOneFailure,
      { _id: action.payload, is_deleted: true },
      token,
    ),
  );
}

function* deleteSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'District delete success',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* deleteFailureFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'something went wrong',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* loadDistrict(action) {
  const query = action.payload.state_id;
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `static/nepal/district?size=100&state_id=${query}`,
      actions.loadDistrictSuccess,
      actions.loadDistrictFailure,
      token,
    ),
  );
}

function* loadState() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `static/nepal/state`,
      actions.loadStateSuccess,
      actions.loadStateFailure,
      token,
    ),
  );
}

function* addIsActiveRequest(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.post(
      'static/nepal/vdc/active',
      actions.addIsActiveSuccess,
      actions.addIsActiveFailure,
      {
        _id: action.payload._id,
        is_active: !action.payload.status,
      },
      token,
    ),
  );
}

// Individual exports for testing
export default function* vdcSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.ADD_EDIT_REQUEST, addEdit);
  yield takeLatest(types.ADD_EDIT_FAILURE, addEditFailureFunc);
  yield takeLatest(types.ADD_EDIT_SUCCESS, addEditSuccessFunc);
  yield takeLatest(types.DELETE_ONE_REQUEST, deleteVdc);
  yield takeLatest(types.DELETE_ONE_FAILURE, deleteFailureFunc);
  yield takeLatest(types.DELETE_ONE_SUCCESS, deleteSuccessFunc);
  yield takeLatest(types.LOAD_DISTRICT_REQUEST, loadDistrict);
  yield takeLatest(types.LOAD_STATE_REQUEST, loadState);
  yield takeLatest(types.ADD_IS_ACTIVE_REQUEST, addIsActiveRequest);
}
