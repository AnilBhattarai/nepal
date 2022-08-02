import { takeLatest, call, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import { makeSelectOne } from './selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadComment(action) {
  const token = yield select(makeSelectToken());
  console.log('comment-edit saga part');
  yield call(
    Api.get(
      `comment/comment/${action.payload.key}/${action.payload.id}`,
      actions.loadCommentSuccess,
      actions.loadCommentFailure,
      token,
    ),
  );
}

function* ownComment(action) {
  const token = yield select(makeSelectToken());
  // console.log(action.payload);
  yield call(
    Api.get(
      `comment/comment/${action.payload.key}/${action.payload.id}/user`,
      actions.loadOwnCommentSuccess,
      actions.loadOwnCommentFailure,
      token,
    ),
  );
}

function* deleteComment(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.delete(
      `comment/${action.payload}`,
      actions.deleteCommentSuccess,
      actions.deleteCommentFailure,
      token,
    ),
  );
}

function* loadMyComment(action) {
  const token = yield select(makeSelectToken());
  // console.log(action.payload);
  const data = yield select(makeSelectOne());
  yield call(
    Api.post(
      `comment/comment/${action.payload.key}/${action.payload.id}`,
      actions.loadMyCommentSuccess,
      actions.loadMyCommentFailure,
      data,
      token,
    ),
  );
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

function* replyComment(action) {
  const token = yield select(makeSelectToken());
  const data = {};
  console.log(action.payload.comment_id, 'id');
  console.log(action.payload.value, 'value');
  data.title = action.payload.value;
  yield call(
    Api.post(
      `comment/reply/${action.payload.comment_id}`,
      actions.replyCommentSuccess,
      actions.replyCommentFailure,
      data,
      token,
    ),
  );
}

function* postComment(action) {
  const token = yield select(makeSelectToken());
  let data = yield select(makeSelectOne());
  data = { title: data.title };
  // delete data._id;
  const onSuccess = data._id
    ? actions.editCommentSuccess
    : actions.postCommentSuccess;
  yield call(
    Api.post(
      `comment/comment/${action.payload.key}/${action.payload.id}`,
      onSuccess,
      actions.postCommentFailure,
      data,
      token,
    ),
  );
}

// Individual exports for testing
export default function* commentsSaga() {
  // load all approved comments
  yield takeLatest(types.LOAD_COMMENT_REQUEST, loadComment);

  yield takeLatest(types.OWN_COMMENT_REQUEST, ownComment);
  // add comments
  yield takeLatest(types.POST_COMMENT_REQUEST, postComment);
  // load forum....
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.DELETE_COMMENT_REQUEST, deleteComment);

  yield takeLatest(types.REPLY_COMMENT_REQ, replyComment);
  // to edit comment
  yield takeLatest(types.LOAD_MY_COMMENT_REQUEST, loadMyComment);
}
