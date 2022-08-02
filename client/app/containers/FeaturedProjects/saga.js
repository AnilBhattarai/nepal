import { takeLatest, call, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadAll() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      // `property/public/data?size=4`,
      `property/type/featured_projects`,
      actions.loadAllSuccess,
      actions.loadAllFailure,
      token,
    ),
  );
}

// Individual exports for testing
export default function* featuredProjectsSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
}
