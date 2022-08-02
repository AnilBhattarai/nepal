import { takeLatest, call, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../../containers/App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadPopUp(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `popup/${action.payload}`,
      actions.loadPopUpSuccess,
      actions.loadPopUpFailure,
      token,
    ),
  );
}

// Individual exports for testing
export default function* popUpSaga() {
  yield takeLatest(types.LOAD_POP_UP_REQUEST, loadPopUp);
}
