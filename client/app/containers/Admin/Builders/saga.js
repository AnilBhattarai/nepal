import {
  takeLatest,
  take,
  call,
  fork,
  put,
  select,
  cancel,
} from 'redux-saga/effects';
import { push, LOCATION_CHANGE } from 'connected-react-router';
import Api from 'utils/Api';
import { makeSelectToken } from '../../App/selectors';
import { enqueueSnackbar } from '../../App/actions';
import * as types from './constants';
import * as actions from './actions';
import { makeSelectBuilderData } from './selectors';

function* loadAll(action) {
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
      `user/builder?${query}`,
      actions.loadAllSuccess,
      actions.loadAllFailure,
      token,
    ),
  );
}

function* builderData(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `user/builder/detail/${action.payload}`,
      actions.builderDataSuccess,
      actions.builderDataFailure,
      token,
    ),
  );
}

function* applyBuilderSuccessful(action) {
  const defaultMsg = {
    message: action.payload.msg || 'Applied for builder successfully',
    options: {
      variant: 'success',
    },
  };

  yield put(enqueueSnackbar(defaultMsg));
}

function* applyBuilderFail(action) {
  const defaultMsg = {
    message: action.payload.msg || 'Somthing went wrong',
    options: {
      variant: 'warning',
    },
  };

  yield put(enqueueSnackbar(defaultMsg));
}

function* redirectOnSuccess() {
  yield take(types.APPLY_BUILDER_SUCCESS);
  yield put(push('/admin/builders-manage'));
}

function* applyBuilder(action) {
  const successWatcher = yield fork(redirectOnSuccess);
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectBuilderData());
  yield fork(
    Api.post(
      'user/builder/verify',
      actions.applyBuilderSuccess,
      actions.applyBuilderFailure,
      {
        is_verified: data.builder.is_verified,
        _id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        reason: action.payload.reason,
      },
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.APPLY_BUILDER_FAILURE]);
  yield cancel(successWatcher);
}

export default function* adminBuildersManagePageSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);

  yield takeLatest(types.BUILDER_DATA_REQUEST, builderData);
  yield takeLatest(types.APPLY_BUILDER_REQUEST, applyBuilder);
  yield takeLatest(types.APPLY_BUILDER_SUCCESS, applyBuilderSuccessful);
  yield takeLatest(types.APPLY_BUILDER_FAILURE, applyBuilderFail);
}
