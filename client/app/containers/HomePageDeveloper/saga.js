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
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';
import { enqueueSnackbar } from '../App/actions';

function* loadAll(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `user/developers/public`,
      actions.loadAllSuccess,
      actions.loadAllFailure,
      token,
    ),
  );
}

function* loadListing(action) {
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
      `user/developers/public?size=5${query}`,
      actions.loadListingSuccess,
      actions.loadListingFailure,
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
      `user/developers/public?${query}`,
      actions.loadMoreSuccess,
      actions.loadMoreFailure,
      token,
    ),
  );
}

// Individual exports for testing
export default function* homePageDeveloperSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
  yield takeLatest(types.LOAD_LISTING_REQUEST, loadListing);
  yield takeLatest(types.LOAD_MORE_REQUEST, loadMore);
}
