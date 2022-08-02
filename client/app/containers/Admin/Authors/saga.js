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
import { makeSelectAuthorData } from './selectors';

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
      `user/author?${query}`,
      actions.loadAllSuccess,
      actions.loadAllFailure,
      token,
    ),
  );
}

function* authorData(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `user/author/detail/${action.payload}`,
      actions.authorDataSuccess,
      actions.authorDataFailure,
      token,
    ),
  );
}

function* applyAuthorSuccessful(action) {
  const defaultMsg = {
    message: action.payload.msg || 'Applied for author successfully',
    options: {
      variant: 'success',
    },
  };

  yield put(enqueueSnackbar(defaultMsg));
}

function* applyAuthorFail(action) {
  const defaultMsg = {
    message: action.payload.msg || 'Somthing went wrong',
    options: {
      variant: 'warning',
    },
  };

  yield put(enqueueSnackbar(defaultMsg));
}

function* redirectOnSuccess() {
  yield take(types.APPLY_AUTHOR_SUCCESS);
  yield put(push('/admin/authors-manage'));
}

function* applyAuthor(action) {
  const successWatcher = yield fork(redirectOnSuccess);
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectAuthorData());
  yield fork(
    Api.post(
      'user/author/verify',
      actions.applyAuthorSuccess,
      actions.applyAuthorFailure,
      {
        is_verified: data.author.is_verified,
        _id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        reason: action.payload.reason,
        bio: action.payload.bio,
      },
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.APPLY_AUTHOR_FAILURE]);
  yield cancel(successWatcher);
}

function* addPhoto(action) {
  const token = yield select(makeSelectToken());
  // const media = yield select(makeSelectMedia());
  // console.log('add photo saga', action);
  yield call(
    Api.multipartPost(
      `user/upload/photo/${action.payload.id}`,
      actions.addPhotoSuccess,
      actions.addPhotoFailure,
      {},
      { file: action.payload.file },
      token,
    ),
  );
}

function* addPhotoSuccFunc(action) {
  const defaultMsg = {
    message: 'Author picture updated',
    options: {
      variant: 'success',
    },
  };

  yield put(enqueueSnackbar(defaultMsg));
}

function* addPhotoFailFunc(action) {
  const defaultMsg = {
    message: 'Failed to change author picture',
    options: {
      variant: 'warning',
    },
  };

  yield put(enqueueSnackbar(defaultMsg));
}

export default function* adminAuthorsManagePageSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);

  yield takeLatest(types.AUTHOR_DATA_REQUEST, authorData);
  yield takeLatest(types.APPLY_AUTHOR_REQUEST, applyAuthor);
  yield takeLatest(types.APPLY_AUTHOR_SUCCESS, applyAuthorSuccessful);
  yield takeLatest(types.APPLY_AUTHOR_FAILURE, applyAuthorFail);
  yield takeLatest(types.ADD_PHOTO_REQUEST, addPhoto);
  yield takeLatest(types.ADD_PHOTO_SUCCESS, addPhotoSuccFunc);
  yield takeLatest(types.ADD_PHOTO_FAILURE, addPhotoFailFunc);
}
