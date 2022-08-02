import {
  takeLatest,
  call,
  select,
  put,
  take,
  fork,
  cancel,
} from 'redux-saga/effects';
import { push, LOCATION_CHANGE } from 'connected-react-router';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';

import { makeSelectOne } from './selectors';
import { enqueueSnackbar } from '../App/actions';

function* loadEnum() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get('enum', actions.loadEnumSuccess, actions.loadEnumFailure, token),
  );
}

function* loadLocation() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'static/nepal/all',
      actions.loadLocationSuccess,
      actions.loadLocationFailure,
      token,
    ),
  );
}
// Individual exports for testing
export default function* homeSearchSaga() {
  yield takeLatest(types.LOAD_ENUM_REQUEST, loadEnum);
  yield takeLatest(types.LOAD_LOCATION_REQUEST, loadLocation);
}
