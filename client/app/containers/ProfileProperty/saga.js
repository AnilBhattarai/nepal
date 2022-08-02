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
import { makeSelectToken } from '../App/selectors';
import { enqueueSnackbar } from '../App/actions';

import * as types from './constants';
import * as actions from './actions';

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
      `property?${query}`,
      actions.loadAllSuccess,
      actions.loadAllFailure,
      token,
    ),
  );
}

function* loadOffer(action) {
  const token = yield select(makeSelectToken());

  yield call(
    Api.get(
      `property/offer/${action.payload}`,
      actions.loadOfferSuccess,
      actions.loadOfferFailure,
      token,
    ),
  );
}

function* loadOfferSuccessFunc(action) {
  if (action.payload.totaldata === 0) {
    const snackbarData = {
      message: 'No offers yet',
      options: {
        variant: 'success',
      },
    };
    yield put(enqueueSnackbar(snackbarData));
  } else {
    const snackbarData = {
      message: 'Offers loaded successfully',
      options: {
        variant: 'success',
      },
    };
    yield put(enqueueSnackbar(snackbarData));
  }

  // yield take(actions.clearOffer());
}

function* loadOfferFailureFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong while updating',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
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
      `property?${query}`,
      actions.loadMoreSuccess,
      actions.loadMoreFailure,
      token,
    ),
  );
}

function* loadLocations() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'static/nepal/all',
      actions.loadLocationSuccess,
      actions.loadLocationFailure,
      token,
    ),
  );
}

function* loadAgents(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `agency/getAgentOfAgency/${action.payload}`,
      actions.loadAgentsSuccess,
      actions.loadAgentsFailure,
      token,
    ),
  );
}

function* loadPropertyCount(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `property/property/count`,
      actions.loadPropertyCountSuccess,
      actions.loadPropertyCountFailure,
      token,
    ),
  );
}

// Individual exports for testing
export default function* profilePropertySaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
  yield takeLatest(types.LOAD_OFFER_REQUEST, loadOffer);
  yield takeLatest(types.LOAD_OFFER_SUCCESS, loadOfferSuccessFunc);
  yield takeLatest(types.LOAD_OFFER_FAILURE, loadOfferFailureFunc);
  yield takeLatest(types.LOAD_MORE_REQUEST, loadMore);
  yield takeLatest(types.LOAD_LOCATION_REQUEST, loadLocations);
  yield takeLatest(types.LOAD_AGENTS_REQUEST, loadAgents);
  yield takeLatest(types.LOAD_PROPERTY_COUNT_REQUEST, loadPropertyCount);
}
