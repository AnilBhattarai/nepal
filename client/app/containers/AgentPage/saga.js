import { takeLatest, call, select, put } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';
import { enqueueSnackbar } from '../App/actions';
import { makeSelectForm } from './selectors';

function* loadAll(action) {
  const token = yield select(makeSelectToken());

  let query = '';
  if (action.payload.query && typeof action.payload.query === 'object') {
    Object.keys(action.payload.query).map(each => {
      query = `${query}&${each}=${action.payload.query[each]}`;
      return null;
    });
  }

  console.log('all', action.payload);
  console.log('query', query);

  yield call(
    Api.get(
      `property/public/data?size=8&${query}`,
      actions.loadAllSuccess,
      actions.loadAllFailure,
      token,
    ),
  );
}

function* loadAgency(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `agency/public/${action.payload}`,
      actions.loadAgentSuccess,
      actions.loadAgentFailure,
      token,
    ),
  );
}

function* loadEnum() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get('enum', actions.loadEnumsSuccess, actions.loadEnumsFailure, token),
  );
}

function* loadData(action) {
  const token = yield select(makeSelectToken());

  yield call(
    Api.get(
      `property/public/data?agency_id=${action.payload}`,
      actions.loadDataSuccess,
      actions.loadDataFailure,
      token,
    ),
  );
}

function* contactAgency(action) {
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectForm());
  yield call(
    Api.post(
      `contactagent`,
      actions.contactAgencySuccess,
      actions.contactAgencyFailure,
      data,
      token,
    ),
  );
}

function* contactSuccess(action) {
  const snackbarData = {
    message: action.payload.msg || 'Update success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* contactFailure(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong while updating',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}
// Individual exports for testing
export default function* agentPageSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
  yield takeLatest(types.LOAD_AGENT_REQUEST, loadAgency);
  yield takeLatest(types.LOAD_ENUMS_REQUEST, loadEnum);
  yield takeLatest(types.LOAD_DATA_REQUEST, loadData);
  yield takeLatest(types.CONTACT_AGENCY_REQUEST, contactAgency);
  yield takeLatest(types.CONTACT_AGENCY_SUCCESS, contactSuccess);
  yield takeLatest(types.CONTACT_AGENCY_FAILURE, contactFailure);
}
