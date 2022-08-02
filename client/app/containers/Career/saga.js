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
import Api from '../../utils/Api';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';
import { makeSelectOne } from './selectors';
import { enqueueSnackbar } from '../App/actions';

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
    Api.get(`careers`, actions.loadAllSuccess, actions.loadAllFailure, token),
  );
}

function* loadOne(action) {
  const token = yield select(makeSelectToken());
  // console.log('from saga - one :', action.payload);

  yield call(
    Api.get(
      `careers/${action.payload}`,
      actions.loadOneSuccess,
      actions.loadOneFailure,
      token,
    ),
  );
}

function* redirectOnSuccess() {
  yield take(types.APPLY_SUCCESS);
  yield put(push('/careers'));
}

function* addEdit() {
  const successWatcher = yield fork(redirectOnSuccess);
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectOne());
  yield fork(
    Api.post(
      '/careers',
      actions.addEditSuccess,
      actions.addEditFailure,
      data,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.ADD_EDIT_FAILURE]);
  yield cancel(successWatcher);
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

// function* addMedia(action) {
//   const token = yield select(makeSelectToken());
//   yield call(
//     Api.multipartPost(
//       'media/multiple/media',
//       actions.addMediaSuccess,
//       actions.addMediaFailure,
//       {},
//       { file: action.payload },
//       token,
//     ),
//   );
// }

// function* addMediaSuccessFunc(action) {
//   const snackbarData = {
//     message: action.payload.msg || 'Media add success!!',
//     options: {
//       variant: 'success',
//     },
//   };
//   yield put(enqueueSnackbar(snackbarData));
// }

// function* addMediaFailureFunc(action) {
//   const snackbarData = {
//     message: action.payload.msg || 'Something went wrong!!',
//     options: {
//       variant: 'warning',
//     },
//   };
//   yield put(enqueueSnackbar(snackbarData));
// }

// function* deleteMedia(action) {
//   const token = yield select(makeSelectToken());
//   yield call(
//     Api.delete(
//       `media/${action.payload}`,
//       actions.deleteMediaSuccess,
//       actions.deleteMediaFailure,
//       token,
//     ),
//   );
// }

function* deleteCareer(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.delete(
      `career/${action.payload}`,
      actions.deleteOneSuccess,
      actions.deleteOneFailure,
      token,
    ),
  );
}

function* deleteSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'career delete success',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* deleteFailureFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong while deleting!!',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* applyRequest() {
  const successWatcher = yield fork(redirectOnSuccess);
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectOne());
  console.log('data', data);
  yield fork(
    Api.multipartPost(
      'careers/apply',
      actions.applySuccess,
      actions.applyFailure,
      data,
      { cvFile: data.cvFile },
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.APPLY_FAILURE]);
  yield cancel(successWatcher);
}

function* applySuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Update success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
  yield fork(redirectOnSuccess);
}

function* applyFailureFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong while updating',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

// Individual exports for testing
export default function* careerSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.DELETE_ONE_REQUEST, deleteCareer);
  // yield takeLatest(types.DELETE_MEDIA_REQUEST, deleteMedia);
  yield takeLatest(types.DELETE_ONE_SUCCESS, deleteSuccessFunc);
  yield takeLatest(types.DELETE_ONE_FAILURE, deleteFailureFunc);
  yield takeLatest(types.ADD_EDIT_REQUEST, addEdit);
  yield takeLatest(types.ADD_EDIT_FAILURE, addEditFailureFunc);
  yield takeLatest(types.ADD_EDIT_SUCCESS, addEditSuccessFunc);
  // yield takeLatest(types.ADD_MEDIA_REQUEST, addMedia);
  // yield takeLatest(types.ADD_MEDIA_SUCCESS, addMediaSuccessFunc);
  // yield takeLatest(types.ADD_MEDIA_FAILURE, addMediaFailureFunc);
  yield takeLatest(types.APPLY_REQUEST, applyRequest);
  yield takeLatest(types.APPLY_FAILURE, applyFailureFunc);
  yield takeLatest(types.APPLY_SUCCESS, applySuccessFunc);
}
