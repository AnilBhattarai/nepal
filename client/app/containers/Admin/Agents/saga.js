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
import { makeSelectAgentData } from './selectors';

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
      `user/agent?${query}`,
      actions.loadAllSuccess,
      actions.loadAllFailure,
      token,
    ),
  );
}

function* agentData(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `user/agent/detail/${action.payload}`,
      actions.agentDataSuccess,
      actions.agentDataFailure,
      token,
    ),
  );
}

function* applyAgentSuccessful(action) {
  const defaultMsg = {
    message: action.payload.msg || 'Applied for agent successfully',
    options: {
      variant: 'success',
    },
  };

  yield put(enqueueSnackbar(defaultMsg));
}

function* applyAgentFail(action) {
  const defaultMsg = {
    message: action.payload.msg || 'Somthing went wrong',
    options: {
      variant: 'warning',
    },
  };

  yield put(enqueueSnackbar(defaultMsg));
}

function* redirectOnSuccess() {
  yield take(types.APPLY_AGENT_SUCCESS);
  yield put(push('/admin/agents-manage'));
}

function* applyAgent(action) {
  const successWatcher = yield fork(redirectOnSuccess);
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectAgentData());
  yield fork(
    Api.post(
      'user/agent/verify',
      actions.applyAgentSuccess,
      actions.applyAgentFailure,
      {
        is_verified: data.agent.is_verified,
        _id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        reason: action.payload.reason,
      },
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.APPLY_AGENT_FAILURE]);
  yield cancel(successWatcher);
}

function* loadAgency() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `agency?page=0`,
      actions.loadAgencySuccess,
      actions.loadAgencyFailure,
      token,
    ),
  );
}

export default function* adminAgentsManagePageSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);

  yield takeLatest(types.AGENT_DATA_REQUEST, agentData);
  yield takeLatest(types.APPLY_AGENT_REQUEST, applyAgent);
  yield takeLatest(types.APPLY_AGENT_SUCCESS, applyAgentSuccessful);
  yield takeLatest(types.APPLY_AGENT_FAILURE, applyAgentFail);
  yield takeLatest(types.LOAD_AGENCY_REQUEST, loadAgency);
}
