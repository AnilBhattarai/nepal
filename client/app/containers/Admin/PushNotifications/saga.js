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
import { makeSelectToken } from '../../App/selectors';
import * as types from './constants';
import * as actions from './actions';
import { makeSelectNotification } from './selectors';
import { enqueueSnackbar } from '../../App/actions';

function* loadUsers() {
  const token = yield select(makeSelectToken());

  yield call(
    Api.get(
      `notificationmobile`,
      actions.loadUserSuccess,
      actions.loadUserFailure,
      token,
    ),
  );
}

function* sendNotifications() {
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectNotification());

  if (data.user_id === 'all') {
    const newData = { title: data.title, body: data.body };
    yield fork(
      Api.post(
        'notification/sendAll',
        actions.sendNotificationSuccess,
        actions.sendNotificationFailure,
        newData,
        token,
      ),
    );
  } else {
    yield fork(
      Api.post(
        'notification/sendone',
        actions.sendNotificationSuccess,
        actions.sendNotificationFailure,
        data,
        token,
      ),
    );
  }

  yield take([LOCATION_CHANGE, types.SEND_NOTIFICATION_FAILURE]);
}

function* sendSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Update success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* sendFailureFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong while updating',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

// Individual exports for testing
export default function* pushNotificationsSaga() {
  yield takeLatest(types.LOAD_USER_REQUEST, loadUsers);
  yield takeLatest(types.SEND_NOTIFICATION_REQUEST, sendNotifications);
  yield takeLatest(types.SEND_NOTIFICATION_SUCCESS, sendSuccessFunc);
  yield takeLatest(types.SEND_NOTIFICATION_FAILURE, sendFailureFunc);
}
