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
import Api from '../../utils/Api';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';
import { makeSelectOne, makeSelectQuery } from './selectors';
import { enqueueSnackbar } from '../App/actions';

function* loadAll(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `resource/public`,
      actions.loadAllSuccess,
      actions.loadAllFailure,
      token,
    ),
  );
}

// Individual exports for testing
export default function* documentsSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
}
