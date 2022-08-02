import { takeLatest, call, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadLocation(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `static/nepal/all?active=all`,
      actions.loadLocationSuccess,
      actions.loadLocationFailure,
      token,
    ),
  );
}

function* setActive(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.post(
      `static/nepal/${action.payload.key}/active`,
      actions.setActiveSuccess,
      actions.setActiveFailure,
      { ...action.payload.data },
      token,
    ),
  );
}

// Individual exports for testing
export default function* locationTreeViewSaga() {
  yield takeLatest(types.LOAD_LOCATION_REQUEST, loadLocation);
  yield takeLatest(types.SET_ACTIVE_REQUEST, setActive);
}
