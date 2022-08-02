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
import {
  makeSelectOffer,
  makeSelectOne,
  makeSelectFavorite,
  makeSelectFeedback,
} from './selectors';
import { enqueueSnackbar } from '../App/actions';

function* defaultAction(action) {
  const token = yield select(makeSelectToken());
  //  yield call(
  //    Api.get(
  //      `someroute/${action.payload}`,
  //      actions.defaultActionSuccess,
  //      actions.defaultActionFailure,
  //      token,
  //    ),
  //  );
}

function* loadAll(action) {
  const token = yield select(makeSelectToken());
  // let query = '';
  // if (action.payload && typeof action.payload === 'object') {
  //   Object.keys(action.payload).map(each => {
  //     query = `${query}&${each}=${action.payload[each]}`;
  //     return null;
  //   });
  // }
  console.log('all', action.payload);

  yield call(
    Api.get(
      `property/public/data?${action.payload}`,
      actions.loadAllSuccess,
      actions.loadAllFailure,
      token,
    ),
  );
}

function* loadMore(action) {
  const token = yield select(makeSelectToken());

  console.log('all', action.payload);

  yield call(
    Api.get(
      `property/public/data?${action.payload}`,
      actions.loadMoreSuccess,
      actions.loadMoreFailure,
      token,
    ),
  );
}

function* loadAgency(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `agency/public/${action.payload}`,
      actions.loadAgencySuccess,
      actions.loadAgencyFailure,
      token,
    ),
  );
}

function* loadFavorite(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `favorite/${action.payload}`,
      actions.loadFavoriteSuccess,
      actions.loadFavoriteFailure,
      token,
    ),
  );
}

function* setFavorite(action) {
  const token = yield select(makeSelectToken());
  const one = yield select(makeSelectFavorite());
  const data = {
    is_favourite: !one.is_favourite,
    property_id: one.property_id,
  };
  yield call(
    Api.post(
      `favorite`,
      actions.setFavoriteSuccess,
      actions.setFavoriteFailure,
      data,
      token,
    ),
  );
}

function* setFavFailureFunc(action) {
  const snackbarData = {
    message: 'Login first!',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}
function* loadDeveloper(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `user/developers/${action.payload}`,
      actions.loadDeveloperSuccess,
      actions.loadDeveloperFailure,
      token,
    ),
  );
}

function* loadOne(action) {
  const token = yield select(makeSelectToken());

  yield call(
    Api.get(
      `property/public/data/${action.payload}`,
      actions.loadOneSuccess,
      actions.loadOneFailure,
      token,
    ),
  );
}

function* redirectOnSuccess() {
  yield take(types.MAKE_OFFER_SUCCESS);
  // yield put(push(`/detail/${action.payload}`));
}

function* makeOffer(action) {
  // const successWatcher = yield fork(redirectOnSuccess());
  // console.log('makeoffer saga', action.payload);

  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectOffer());
  yield fork(
    Api.post(
      `property/offer/${action.payload}`,
      actions.makeOfferSuccess,
      actions.makeOfferFailure,
      data,
      token,
    ),
  );
  // yield take([LOCATION_CHANGE, types.MAKE_OFFER_FAILURE]);
  // yield cancel(successWatcher);
}

function* makeOfferSuccessFunc(action) {
  const snackbarData = {
    message: 'Message sent successfully',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
  // yield take(actions.clearOffer());
}

function* makeOfferFailureFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong while updating',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* loadComplainType(action) {
  const token = yield select(makeSelectToken());

  yield call(
    Api.get(
      `enum`,
      actions.loadComplainTypeSuccess,
      actions.loadComplainTypeFailure,
      token,
    ),
  );
}

function* postFeedback(action) {
  // const successWatcher = yield fork(redirectOnSuccess());
  // console.log('makeoffer saga', action.payload);

  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectFeedback());
  yield fork(
    Api.post(
      `feedback`,
      actions.postFeedbackSuccess,
      actions.postFeedbackFailure,
      data,
      token,
    ),
  );
  // yield take([LOCATION_CHANGE, types.MAKE_OFFER_FAILURE]);
  // yield cancel(successWatcher);
}

function* postFeedbackSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Message sent successfully',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
  // yield take(actions.clearOffer());
}

function* postFeedbackFailureFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong while updating',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* setCount(action) {
  const token = yield select(makeSelectToken());
  const data = {
    property_id: action.payload,
  };
  yield call(
    Api.post(
      `view-count`,
      actions.setCountSuccess,
      actions.setCountFailure,
      data,
      token,
    ),
  );
}

function* saveSearch(action) {
  const token = yield select(makeSelectToken());
  const data = {
    ...action.payload,
  };
  yield call(
    Api.post(
      `search-filter`,
      actions.saveSearchSuccess,
      actions.saveSearchFailure,
      data,
      token,
    ),
  );
}

// Individual exports for testing
export default function* listViewSaga() {
  yield takeLatest(types.DEFAULT_ACTION_REQUEST, defaultAction);
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.LOAD_AGENCY_REQUEST, loadAgency);
  yield takeLatest(types.LOAD_DEVELOPER_REQUEST, loadDeveloper);
  yield takeLatest(types.MAKE_OFFER_REQUEST, makeOffer);
  yield takeLatest(types.MAKE_OFFER_FAILURE, makeOfferFailureFunc);
  yield takeLatest(types.MAKE_OFFER_SUCCESS, makeOfferSuccessFunc);
  yield takeLatest(types.SET_FAVORITE_VALUE, setFavorite);
  yield takeLatest(types.SET_FAVORITE_FAILURE, setFavFailureFunc);
  yield takeLatest(types.LOAD_FAVORITE_REQUEST, loadFavorite);
  yield takeLatest(types.LOAD_COMPLAIN_TYPE_REQUEST, loadComplainType);

  yield takeLatest(types.POST_FEEDBACK_REQUEST, postFeedback);
  yield takeLatest(types.POST_FEEDBACK_FAILURE, postFeedbackFailureFunc);
  yield takeLatest(types.POST_FEEDBACK_SUCCESS, postFeedbackSuccessFunc);

  yield takeLatest(types.LOAD_MORE_REQUEST, loadMore);
  yield takeLatest(types.SET_COUNT_REQUEST, setCount);
  yield takeLatest(types.SAVE_SEARCH_REQUEST, saveSearch);
}
