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

function* loadAll() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      // `property/public/data?size=4`,
      `property/type/hot_property`,
      actions.loadAllSuccess,
      actions.loadAllFailure,
      token,
    ),
  );
}

function* loadListing() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      // `property/public/data?size=4`,
      `property/public/data?&find_is_premium=true`,
      actions.loadListingSuccess,
      actions.loadListingFailure,
      token,
    ),
  );
}
// Individual exports for testing
export default function* hotPropertySaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
  yield takeLatest(types.LOAD_LISTING_REQUEST, loadListing);
}
