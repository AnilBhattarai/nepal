import { takeLatest, call, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadAll(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `property/public/data/?size=4`,
      actions.loadAllSuccess,
      actions.loadAllFailure,
      token,
    ),
  );
}

// Individual exports for testing
export default function* recentPropertySaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
}
