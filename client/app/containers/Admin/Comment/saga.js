import {
  take,
  takeLatest,
  call,
  put,
  select,
  fork,
  cancel,
} from 'redux-saga/effects';
import Api from 'utils/Api';
import { LOCATION_CHANGE, push } from 'connected-react-router';
import { makeSelectToken } from '../../App/selectors';
import * as types from './constants';
import * as actions from './actions';
import { enqueueSnackbar } from '../../App/actions';
import { makeSelectOne, makeSelectListed } from './selectors';

function* loadAll(action) {
  const token = yield select(makeSelectToken());
  let query = '';
  if (action.payload) {
    Object.keys(action.payload).map(each => {
      query = `${query}&${each}=${action.payload[each]}`;
      return null;
    });
  }
  // console.log('I am in');
  yield call(
    Api.get(
      `comment?${query}`,
      actions.loadAllSuccess,
      actions.loadAllFailure,
      token,
    ),
  );
}

// function* loadAllSuccessFunc(action) {
//   const snackbarData = {
//     message: action.payload.msg || 'No comments found',
//     options: {
//       variant: 'success',
//     },
//   };
//   yield put(enqueueSnackbar(snackbarData));
// }

function* loadAllFailureFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong while deleting!!',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* loadOne(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `comment/one/${action.payload}`,
      actions.loadOneSuccess,
      actions.loadOneFailure,
      token,
    ),
  );
}

function* loadApprove(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.post(
      `comment/approve`,
      actions.approveSuccess,
      actions.approveFailure,
      action.payload,
      token,
    ),
  );
}

function* approveFailureFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong while approving!!!!',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}
function* loadDisapprove(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.post(
      `comment/disapprove`,
      actions.disapproveSuccess,
      actions.disapproveFailure,
      action.payload,
      token,
    ),
  );
}
function* approveSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Approve success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* disapproveSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Disapprove success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* disapproveFailureFunc(action) {
  const snackbarData = {
    message:
      action.payload.msg || 'Something went wrong while disapproving!!!!',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* redirectOnSuccess() {
  yield take(types.LOAD_MANAGE_SUCCESS);
  yield put(push('/admin/blog-comment-manage'));
}

function* approveDisapprove(action) {
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectListed());
  const sentStatus = action.payload;
  const post = {
    listed_id: [...data],
    details: {
      status: sentStatus,
    },
  };
  yield fork(
    Api.post(
      'comment/commentallapprove',
      actions.approveDisapproveSuccess,
      actions.approveDisapproveFailure,
      post,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.APPROVE_DISAPPROVE_FAILURE]);
  yield cancel(successWatcher);
}

function* approveDisapproveSuccess(action) {
  const snackbarData = {
    message: action.payload.msg || 'Property type delete success',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
  yield put(actions.loadAllRequest());
}

function* approveDisapproveFailure(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong while deleting!!',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

// Individual exports for testing
export default function* blogCommentManagePageSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
  // yield takeLatest(types.LOAD_ALL_SUCCESS, loadAllSuccessFunc);
  yield takeLatest(types.LOAD_ALL_FAILURE, loadAllFailureFunc);
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.APPROVE_DISAPPROVE_REQUEST, approveDisapprove);
  yield takeLatest(types.APPROVE_DISAPPROVE_SUCCESS, approveDisapproveSuccess);
  yield takeLatest(types.APPROVE_DISAPPROVE_FAILURE, approveDisapproveFailure);
}
