import {
  takeLatest,
  take,
  call,
  fork,
  put,
  select,
  cancel,
} from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'connected-react-router';
import Api from 'utils/Api';
import { makeSelectToken } from '../../App/selectors';
import * as types from './constants';
import * as actions from './actions';
import { makeSelectisAd, makeSelectOne } from './selectors';
import { enqueueSnackbar } from '../../App/actions';

function* loadAll(action) {
  console.log('payload: ', action.payload);
  const token = yield select(makeSelectToken());
  let query = '';
  let sort = '';

  if (action.payload) {
    Object.keys(action.payload).map(each => {
      query = `${query}&${each}=${action.payload[each]}`;
      return null;
    });
  }

  if (action.payload && action.payload.sort) {
    sort = `&sort=${action.payload.sort}`;
  }
  yield call(
    Api.get(
      `popup?${query}&${sort}`,
      actions.loadAllSuccess,
      actions.loadAllFailure,
      token,
    ),
  );
}
function* loadMedia(action) {
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
      `media?${query}`,
      actions.loadMediaSuccess,
      actions.loadMediaFailure,
      token,
    ),
  );
}

function* loadOne(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `popup/${action.payload}`,
      actions.loadOneSuccess,
      actions.loadOneFailure,
      token,
    ),
  );
}

function* redirectOnSuccess(goBack) {
  const action = yield take(types.ADD_EDIT_SUCCESS);

  const snackbarData = {
    message: action.payload.msg || 'Slider update success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
  const isAd = yield select(makeSelectisAd());
  if (isAd) {
    yield put(push('/admin/advertisement'));
  } else {
    yield put(push('/admin/popup-setting'));
  }
  // goBack();
}

function* addEdit(action) {
  const successWatcher = yield fork(redirectOnSuccess, action.payload);
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectOne());

  let image_id = [];

  if (data.template === 'ck_editor') {
    image_id = data.templateRequirement.map(function image(each) {
      return {
        caption: each.caption,
        link: each.link,
        start_date: each.start_date,
        end_date: each.end_date,
        description: each.description,
      };
    });
  } else {
    image_id = data.templateRequirement.map(function image(each) {
      return {
        image: each.image._id ? each.image._id : {},
        caption: each.caption,
        link: each.link,
        start_date: each.start_date,
        end_date: each.end_date,
        description: each.description,
      };
    });
  }

  let main_data = { ...data, templateRequirement: image_id };

  if (action.payload.isAd) {
    main_data = { ...main_data, is_advertisement: true };
  }

  yield fork(
    Api.post(
      'popup',
      actions.addEditSuccess,
      actions.addEditFailure,
      main_data,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.ADD_EDIT_FAILURE]);
  yield cancel(successWatcher);
}
function* deletePopUp(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.delete(
      `popup/${action.payload}`,
      actions.deleteOneSuccess,
      actions.deleteOneFailure,
      token,
    ),
  );
}
function* deleteSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Pop up delete success!!',
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

function* addEditFailureFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong while updating!!',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* deleteMultiplePopupRequest(action) {
  const token = yield select(makeSelectToken());
  const data = {
    popup_id: action.payload,
  };

  yield call(
    Api.post(
      `popup/multiple`,
      actions.deleteMultiplePopupSuccess,
      actions.deleteMultiplePopupFailure,
      data,
      token,
    ),
  );
}

function* deleteMultiplePopupSuccess(action) {
  yield put(actions.loadAllRequest());
  const snackbarData = {
    message:
      action.payload && action.payload.msg
        ? action.payload.msg
        : 'Multiple Popup Delete Success!!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* deleteMultiplePopupFailure(action) {
  const snackbarData = {
    message:
      action.payload && action.payload.msg
        ? action.payload.msg
        : 'Something went wrong',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* activeAllPopupRequest(action) {
  const token = yield select(makeSelectToken());
  const data = {
    popup_id: action.payload,
    type: 'is_active',
  };

  yield call(
    Api.post(
      `popup/multiple`,
      actions.activeAllPopupSuccess,
      actions.activeAllPopupFailure,
      data,
      token,
    ),
  );
}

function* activeAllPopupSuccess(action) {
  yield put(actions.loadAllRequest());
  const snackbarData = {
    message:
      action.payload && action.payload.msg
        ? action.payload.msg
        : 'Multiple Status Change Success!!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* activeAllPopupFailure(action) {
  const snackbarData = {
    message:
      action.payload && action.payload.msg
        ? action.payload.msg
        : 'Something went wrong',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.ADD_EDIT_REQUEST, addEdit);
  yield takeLatest(types.LOAD_MEDIA_REQUEST, loadMedia);
  yield takeLatest(types.DELETE_ONE_REQUEST, deletePopUp);
  yield takeLatest(types.DELETE_ONE_SUCCESS, deleteSuccessFunc);
  yield takeLatest(types.DELETE_ONE_FAILURE, deleteFailureFunc);
  yield takeLatest(types.ADD_EDIT_FAILURE, addEditFailureFunc);

  yield takeLatest(
    types.DELETE_MULTIPLE_POPUP_REQUEST,
    deleteMultiplePopupRequest,
  );
  yield takeLatest(
    types.DELETE_MULTIPLE_POPUP_FAILURE,
    deleteMultiplePopupFailure,
  );
  yield takeLatest(
    types.DELETE_MULTIPLE_POPUP_SUCCESS,
    deleteMultiplePopupSuccess,
  );
  yield takeLatest(types.ACTIVE_ALL_POPUP_REQUEST, activeAllPopupRequest);
  yield takeLatest(types.ACTIVE_ALL_POPUP_FAILURE, activeAllPopupFailure);
  yield takeLatest(types.ACTIVE_ALL_POPUP_SUCCESS, activeAllPopupSuccess);
}
