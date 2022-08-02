import {
  takeLatest,
  call,
  select,
  put,
  take,
  fork,
  cancel,
} from 'redux-saga/effects';
import { push, LOCATION_CHANGE } from 'connected-react-router';
import Api from 'utils/Api';
import { makeSelectToken } from '../../App/selectors';
import { makeSelectOne } from './selectors';
import * as types from './constants';
import * as actions from './actions';
import { enqueueSnackbar } from '../../App/actions';

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
      `property/type/all?${query}`,
      actions.loadAllSuccess,
      actions.loadAllFailure,
      token,
    ),
  );
}

function* loadOne(action) {
  const token = yield select(makeSelectToken());

  yield call(
    Api.get(
      `property/type/${action.payload}`,
      actions.loadOneSuccess,
      actions.loadOneFailure,
      token,
    ),
  );
}

function* redirectOnSuccess() {
  yield take(types.ADD_EDIT_SUCCESS);
  yield put(push('/admin/property-section'));
}

function* addEdit() {
  const successWatcher = yield fork(redirectOnSuccess);
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectOne());
  // const property_id = data.properties.map(each => each._id);

  const property_id = data.properties.map(function property(each) {
    return {
      id: each.id._id,
      start_date: each.start_date ? each.start_date : '',
      end_date: each.end_date ? each.end_date : '',
    };
  });

  const main_data = { ...data, properties: [...property_id] };
  console.log('from saga', main_data);
  yield fork(
    Api.post(
      'property/type',
      actions.addEditSuccess,
      actions.addEditFailure,
      main_data,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.ADD_EDIT_FAILURE]);
  yield cancel(successWatcher);
}

function* deletePropertySection(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.delete(
      `property/type/${action.payload}`,
      actions.deleteOneSuccess,
      actions.deleteOneFailure,
      token,
    ),
  );
}

function* deleteSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Property Section delete success',
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
function* loadProperty(action) {
  const token = yield select(makeSelectToken());

  yield call(
    Api.get(
      `property/get_property/${action.payload}`,
      actions.loadPropertySuccess,
      actions.loadPropertyFailure,
      token,
    ),
  );
}

function* loadProject(action) {
  const token = yield select(makeSelectToken());

  yield call(
    Api.get(
      `property/get_project/${action.payload}`,
      actions.loadProjectSuccess,
      actions.loadProjectFailure,
      token,
    ),
  );
}

// Individual exports for testing
export default function* propertySectionSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.ADD_EDIT_REQUEST, addEdit);
  yield takeLatest(types.DELETE_ONE_REQUEST, deletePropertySection);
  yield takeLatest(types.DELETE_ONE_SUCCESS, deleteSuccessFunc);
  yield takeLatest(types.DELETE_ONE_FAILURE, deleteFailureFunc);
  yield takeLatest(types.ADD_EDIT_FAILURE, addEditFailureFunc);
  yield takeLatest(types.ADD_EDIT_SUCCESS, addEditSuccessFunc);
  yield takeLatest(types.LOAD_PROPERTY_REQUEST, loadProperty);
  yield takeLatest(types.LOAD_PROJECT_REQUEST, loadProject);
}
