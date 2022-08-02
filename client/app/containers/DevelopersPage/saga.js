import { takeLatest, call, select, put } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';
import { makeSelectForm } from './selectors';
import { enqueueSnackbar } from '../App/actions';

function* loadDeveloper(action) {
  const token = yield select(makeSelectToken());

  yield call(
    Api.get(
      `property/public/data?${action.payload}`,
      actions.loadDeveloperSuccess,
      actions.loadDeveloperFailure,
      token,
    ),
  );
}

function* loadDeveloperDetail(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `user/developers/${action.payload}`,
      actions.loadDeveloperDetailSuccess,
      actions.loadDeveloperDetailFailure,
      token,
    ),
  );
}

function* contactDeveloper() {
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectForm());
  yield call(
    Api.post(
      `contactdeveloper`,
      actions.contactDeveloperSuccess,
      actions.contactDeveloperFailure,
      data,
      token,
    ),
  );
}
function* contactSuccess(action) {
  const snackbarData = {
    message: action.payload.msg || 'Update success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* contactFailure(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong while updating',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}
// Individual exports for testing
export default function* developersPageSaga() {
  yield takeLatest(types.LOAD_DEVELOPER_REQUEST, loadDeveloper);
  yield takeLatest(types.LOAD_DEVELOPER_DETAIL_REQUEST, loadDeveloperDetail);
  yield takeLatest(types.CONTACT_DEVELOPER_REQUEST, contactDeveloper);
  yield takeLatest(types.CONTACT_DEVELOPER_SUCCESS, contactSuccess);
  yield takeLatest(types.CONTACT_DEVELOPER_FAILURE, contactFailure);
}
