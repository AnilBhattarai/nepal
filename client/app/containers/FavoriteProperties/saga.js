import { takeLatest, call, select, put } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import { enqueueSnackbar } from '../App/actions';

import * as types from './constants';
import * as actions from './actions';

function* loadFavorites(action) {
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
      `favorite?${query}`,
      actions.loadFavoriteSuccess,
      actions.loadFavoriteFailure,
      token,
    ),
  );
}

function* loadMore(action) {
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
      `favorite?${query}`,
      actions.loadMoreSuccess,
      actions.loadMoreFailure,
      token,
    ),
  );
}
// Individual exports for testing
export default function* favoritePropertiesSaga() {
  yield takeLatest(types.LOAD_FAVORITE_REQUEST, loadFavorites);
  yield takeLatest(types.LOAD_MORE_REQUEST, loadMore);
}
