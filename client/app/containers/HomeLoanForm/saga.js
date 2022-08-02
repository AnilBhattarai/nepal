import {
  takeLatest,
  call,
  select,
  fork,
  take,
  put,
  cancel,
} from 'redux-saga/effects';
import Api from 'utils/Api';
import { LOCATION_CHANGE, push } from 'connected-react-router';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';
import { makeSelectOne } from './selectors';
import { enqueueSnackbar } from '../App/actions';

function* redirectOnSuccess() {
  yield take(types.ADD_EDIT_SUCCESS);
}

function* addEdit() {
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectOne());
  console.log('data', data);

  let main_data = { data };
  if (data.is_identified === 'Yes' || data.is_identified === 'yes') {
    main_data = { ...data, is_identified: true };
  } else if (data.is_identified === 'No' || data.is_identified === 'no') {
    main_data = { ...data, is_identified: false };
  }
  if (data.is_co_borrower === 'Yes' || data.is_co_borrower === 'yes') {
    main_data = { ...main_data, is_co_borrower: true };
  } else if (data.is_co_borrower === 'No' || data.is_co_borrower === 'no') {
    main_data = { ...main_data, is_co_borrower: false };
  }
  console.log('maindata', main_data);
  yield fork(
    Api.post(
      'form',
      actions.addEditSuccess,
      actions.addEditFailure,
      main_data,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.ADD_EDIT_FAILURE]);
}

function* addEditSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Update success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* addEditFailureFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong while updating',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* loadCity() {
  const token = yield select(makeSelectToken());

  yield call(
    Api.get(
      `static/nepal/all`,
      actions.loadCitySuccess,
      actions.loadCityFailure,
      token,
    ),
  );
}

function* loadBank() {
  const token = yield select(makeSelectToken());

  yield call(
    Api.get(
      `bankDetailForLoan`,
      actions.loadBankSuccess,
      actions.loadBankFailure,
      token,
    ),
  );
}

function* loadMoreBank(action) {
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
      `bankDetailForLoan?${query}`,
      actions.loadMoreBankSuccess,
      actions.loadMoreBankFailure,
      token,
    ),
  );
}

// Individual exports for testing
export default function* homeLoanFormSaga() {
  yield takeLatest(types.ADD_EDIT_REQUEST, addEdit);
  yield takeLatest(types.ADD_EDIT_SUCCESS, addEditSuccessFunc);
  yield takeLatest(types.ADD_EDIT_FAILURE, addEditFailureFunc);
  yield takeLatest(types.LOAD_CITY_REQUEST, loadCity);
  yield takeLatest(types.LOAD_BANK_REQUEST, loadBank);
  yield takeLatest(types.LOAD_MORE_BANK_REQUEST, loadMoreBank);
}
