import {
  takeLatest,
  select,
  put,
  fork,
  take,
  cancel,
} from 'redux-saga/effects';
import Api from 'utils/Api';
import { LOCATION_CHANGE, push } from 'connected-react-router';
import * as types from './constants';
import * as actions from './actions';
import { makeSelectEmail } from './selectors';
import { enqueueSnackbar } from '../App/actions';

// Individual exports for testing
export const validate = data => {
  const errors = {};
  if (!data.email) errors.email = 'email is required';
  return { errors, isValid: !Object.keys(errors).length };
};

export function* redirectOnSuccess() {
  const { payload } = yield take(types.FORGOT_PASSWORD_SUCCESS);
  // const { token, data } = payload;
  // yield put(setUser(data));
  // yield put(setToken(token));
  // if (redirect) {
  //   yield put(push(redirect));
  // } else {
  //   yield put(push('/'));
  // }
  const email = yield select(makeSelectEmail());

  yield put(push(`/reset-password/${email}`));
}

export function* forgotPasswordAction(action) {
  const email = yield select(makeSelectEmail());
  const data = { email };
  const errors = validate(data);
  if (errors.isValid) {
    const successWatcher = yield fork(redirectOnSuccess, action.redirect);
    yield fork(
      Api.post(
        'user/forgotpassword',
        actions.forgotPasswordSuccess,
        actions.forgotPasswordFailure,
        data,
      ),
    );
    yield take([LOCATION_CHANGE, types.FORGOT_PASSWORD_FAILURE]);
    yield cancel(successWatcher);
  } else {
    yield put(actions.setStoreValue({ key: 'errors', value: errors.errors }));
  }
}

function* forgotPasswordSuccessFunc(action) {
  const snackbarData = {
    message:
      action.payload.msg ||
      'forget password code sent!! Have a look in you email account!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* forgotPasswordFailureFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong while updating',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

export default function* loginAdminPageSaga() {
  yield takeLatest(types.FORGOT_PASSWORD_REQUEST, forgotPasswordAction);
  yield takeLatest(types.FORGOT_PASSWORD_SUCCESS, forgotPasswordSuccessFunc);
  yield takeLatest(types.FORGOT_PASSWORD_FAILURE, forgotPasswordFailureFunc);
}
