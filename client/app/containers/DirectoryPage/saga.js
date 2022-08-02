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
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';
import { enqueueSnackbar } from '../App/actions';

function* loadAll(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      // `property/public/data?size=4`,
      `directory/all`,
      actions.loadAllSuccess,
      actions.loadAllFailure,
      token,
    ),
  );
}

function* loadEnum(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(`enum`, actions.loadEnumSuccess, actions.loadEnumFailure, token),
  );
}

// Individual exports for testing
export default function* directoryPageSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
  yield takeLatest(types.LOAD_ENUM_REQUEST, loadEnum);
}
