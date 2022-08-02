import {
  takeLatest,
  take,
  call,
  fork,
  put,
  select,
  cancel,
} from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';
import { enqueueSnackbar } from '../App/actions';

function* loadOne(action) {
  const token = yield select(makeSelectToken());
  let query = '';
  if (action.payload) {
    Object.keys(action.payload).map(each => {
      query = `${query}&${each}=${action.payload[each]}`;
      return null;
    });
  }
  yield call(
    Api.get(
      `user/loginlogs?${query}`,
      actions.loadOneSuccess,
      actions.loadOneFailure,
      token,
    ),
  );
}

function* logout(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.post(
      'user/loginlogs/logout',
      actions.logoutSuccess,
      actions.logoutFailure,
      {
        loginID: action.payload,
      },
      token,
    ),
  );
}

function* logoutSuccessful(action) {
  const defaultError = {
    message: action.payload.msg || 'logged out successfully',
    options: {
      variant: 'success',
    },
  };

  yield put(enqueueSnackbar(defaultError));
}
export default function* loginLogsPageSaga() {
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.LOGOUT_REQUEST, logout);
  yield takeLatest(types.LOGOUT_SUCCESS, logoutSuccessful);
}
