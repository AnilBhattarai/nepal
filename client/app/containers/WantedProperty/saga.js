import { takeLatest, call, select, put } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';
import { makeSelectForm } from './selectors';
import { enqueueSnackbar } from '../App/actions';

function* loadAll() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `myrequest/public?size=4`,
      actions.loadAllSuccess,
      actions.loadAllFailure,
      token,
    ),
  );
}
function* loadListing(action) {
  const token = yield select(makeSelectToken());
  console.log('saga', action.payload);
  let query = '';
  if (action.payload) {
    Object.keys(action.payload).map(each => {
      query = `${query}&${each}=${action.payload[each]}`;
      return null;
    });
  }
  yield call(
    Api.get(
      `myrequest/public?size=25${query}`,
      actions.loadListingSuccess,
      actions.loadListingFailure,
      token,
    ),
  );
}
function* makeRequest() {
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectForm());
  yield call(
    Api.post(
      `myrequest`,
      actions.makeFormSuccess,
      actions.makeFormFailure,
      data,
      token,
    ),
  );
}
function* makeRequestSuccessFunc(action) {
  const snackbarData = {
    message: 'Request made successfully',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
  // yield take(actions.clearRequest());
}

function* makeRequestFailureFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong while updating',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* loadPurpose() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get('enum', actions.loadPurposeSuccess, actions.loadPurposeFailure),
  );
}

function* loadLocation() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'static/nepal/all',
      actions.loadLocationSuccess,
      actions.loadLocationFailure,
    ),
  );
}
// Individual exports for testing
export default function* wantedPropertySaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
  yield takeLatest(types.LOAD_LISTING_REQUEST, loadListing);
  yield takeLatest(types.MAKE_FORM_REQUEST, makeRequest);
  yield takeLatest(types.LOAD_PURPOSE_REQUEST, loadPurpose);
  yield takeLatest(types.MAKE_FORM_SUCCESS, makeRequestSuccessFunc);
  yield takeLatest(types.MAKE_FORM_FAILURE, makeRequestFailureFunc);
  yield takeLatest(types.LOAD_LOCATION_REQUEST, loadLocation);
}
