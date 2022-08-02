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
import Api from '../../../utils/Api';
import { makeSelectToken } from '../../App/selectors';
import * as types from './constants';
import * as actions from './actions';
import { makeSelectOne, makeSelectAll } from './selectors';
import { enqueueSnackbar } from '../../App/actions';
import makeSelectMedia from '../Media/selectors';

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

function* loadOne(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `property/${action.payload}`,
      actions.loadOneSuccess,
      actions.loadOneFailure,
      token,
    ),
  );
}

function* redirectOnSuccess() {
  yield take(types.ADD_EDIT_SUCCESS);
  // const data = makeSelectOne();
  if (window.location.pathname.includes('edit')) {
    yield put(actions.setIsBack(true));
  } else {
    yield put(actions.setIsBack(false));
  }
  if (
    window.location.pathname.includes('user') &&
    window.location.pathname.includes('property')
  ) {
    yield put(push(`/user/property`));
  } else if (
    window.location.pathname.includes('user') &&
    window.location.pathname.includes('project')
  ) {
    yield put(push(`/user/project`));
  } else if (
    window.location.pathname.includes('admin') &&
    window.location.pathname.includes('project')
  ) {
    yield put(push(`/admin/project-manage`));
  } else {
    yield put(push(`/admin/property`));
  }
  // yield put(push(`/${type}/property`));
}

function* addEdit() {
  const successWatcher = yield fork(redirectOnSuccess);
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectOne());
  // const media_id = data.media.images.map(each => each.id._id);
  const image_id = data.media.images.map(function image(each) {
    return {
      id: each.id._id,
      caption: each.caption,
    };
  });
  let main_data = {};

  const trimmedPrice = {
    ...data.price,
    value:
      (data.price &&
        data.price.value &&
        data.price.value.toString().replace(/,/g, '')) ||
      '',
  };

  if (data.is_project) {
    const payment_id = data.project_payment_plan.map(function paymeny(each) {
      return {
        image: each.image._id,
        title: each.title,
      };
    });
    const project_type = data.project_property_type;

    const new_project_type = [];
    for (let index = 0; index < project_type.length; index++) {
      const image = [...project_type[index].image];
      let project_image = [];
      if (image.length > 0) {
        project_image = image.map(function paymeny(each) {
          return each._id;
        });

        new_project_type[index] = {
          ...data.project_property_type[index],
          image: project_image,
        };
      } else {
        new_project_type[index] = {
          ...data.project_property_type[index],
        };
      }
    }
    main_data = {
      ...data,
      media: {
        images: [...image_id],
        youtube_video_id: data.media.youtube_video_id,
      },
      project_payment_plan: [...payment_id],
      project_property_type: [...new_project_type],
      is_save: true,
    };
  } else {
    main_data = {
      ...data,
      price: trimmedPrice,
      media: {
        images: [...image_id],
        youtube_video_id: data.media.youtube_video_id,
      },
      is_save: true,
    };
  }
  yield fork(
    Api.post(
      'property',
      actions.addEditSuccess,
      actions.addEditFailure,
      main_data,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.ADD_EDIT_FAILURE]);
  yield cancel(successWatcher);
}

function* deleteProperty(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.delete(
      `property/${action.payload}`,
      actions.deleteOneSuccess,
      actions.deleteOneFailure,
      token,
    ),
  );
}

function* deleteSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Property delete success',
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

function* loadEnum() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get('enum', actions.loadEnumSuccess, actions.loadEnumFailure, token),
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

function* loadAgents() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'agency/getall/dropdown',
      actions.loadAgentsSuccess,
      actions.loadAgentsFailure,
      token,
    ),
  );
}

function* loadDevelopers() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'user/developers/public/all',
      actions.loadDevelopersSuccess,
      actions.loadDevelopersFailure,
      token,
    ),
  );
}

function* loadState() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'static/state',
      actions.loadStateSuccess,
      actions.loadStateFailure,
      token,
    ),
  );
}

function* loadDistrict(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `static/district/_id/${action.payload}`,
      actions.loadDistrictSuccess,
      actions.loadDistrictFailure,
      token,
    ),
  );
}
function* loadMunicipality(action) {
  const token = yield select(makeSelectToken());
  // const temp_address = yield select(makeSelectTempAddress());

  // const state = yield select(makeSelectLocation());

  yield call(
    Api.get(
      `static/municipality/_id/${action.payload}`,
      actions.loadMunicipalitySuccess,
      actions.loadMunicipalityFailure,
      token,
    ),
  );
}
function* loadArea(action) {
  const token = yield select(makeSelectToken());

  yield call(
    Api.get(
      `static/area/_id/${action.payload}`,
      actions.loadAreaSuccess,
      actions.loadAreaFailure,
      token,
    ),
  );
}

function* addMedia(action) {
  const token = yield select(makeSelectToken());
  // const media = yield select(makeSelectMedia());
  yield call(
    Api.multipartPost(
      'media/multiple/media',
      actions.addMediaSuccess,
      actions.addMediaFailure,
      {},
      { file: action.payload },
      token,
    ),
  );
}
function* deleteMedia(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.delete(
      `media/${action.payload}`,
      actions.deleteMediaSuccess,
      actions.deleteMediaFailure,
      token,
    ),
  );
}
function* addMediaSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Media add success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* addMediaFailureFunc(action) {
  const snackbarData = {
    // message: action.payload.msg || 'Something went wrong!!',
    message: 'Something went wrong!!',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* deleteMediaSuccessFunc(action) {
  const snackbarData = {
    message: 'Media delete success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* deleteMediaFailureFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong while deleting!!',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* addFloorPlan(action) {
  const token = yield select(makeSelectToken());
  // const media = yield select(makeSelectFloorPlan());
  yield call(
    Api.multipartPost(
      'media/multiple/media',
      actions.addFloorPlanSuccess,
      actions.addFloorPlanFailure,
      {},
      { document: action.payload },
      token,
    ),
  );
}
function* deleteFloorPlan(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.delete(
      `media/${action.payload}`,
      actions.deleteFloorPlanSuccess,
      actions.deleteFloorPlanFailure,
      token,
    ),
  );
}
function* addFloorPlanSuccessFunc(action) {
  const snackbarData = {
    message: 'FloorPlan add success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* addFloorPlanFailureFunc(action) {
  const snackbarData = {
    // message: action.payload.msg || 'Something went wrong!!',
    message: 'Something went wrong!!',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* deleteFloorPlanSuccessFunc(action) {
  const snackbarData = {
    message: 'FloorPlan delete success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* deleteFloorPlanFailureFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong while deleting!!',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* addPaymentPlan(action) {
  const token = yield select(makeSelectToken());
  // const media = yield select(makeSelectPaymentPlan());
  yield call(
    Api.multipartPost(
      'media/multiple/media',
      actions.addPaymentPlanSuccess,
      actions.addPaymentPlanFailure,
      {},
      { document: action.payload },
      token,
    ),
  );
}
function* deletePaymentPlan(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.delete(
      `media/${action.payload}`,
      actions.deletePaymentPlanSuccess,
      actions.deletePaymentPlanFailure,
      token,
    ),
  );
}
function* addPaymentPlanSuccessFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'PaymentPlan add success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* addPaymentPlanFailureFunc(action) {
  const snackbarData = {
    // message: action.payload.msg || 'Something went wrong!!',
    message: 'Something went wrong!!',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* deletePaymentPlanSuccessFunc(action) {
  const snackbarData = {
    message: 'PaymentPlan delete success!!',
    options: {
      variant: 'success',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* deletePaymentPlanFailureFunc(action) {
  const snackbarData = {
    message: action.payload.msg || 'Something went wrong while deleting!!',
    options: {
      variant: 'warning',
    },
  };
  yield put(enqueueSnackbar(snackbarData));
}

function* loadUserStatus(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `user/info/property`,
      actions.loadUserStatusSuccess,
      actions.loadUserStatusFailure,
      token,
    ),
  );
}

function* addProjectTypeImage(action) {
  const token = yield select(makeSelectToken());
  // const media = yield select(makeSelectPaymentPlan());
  yield call(
    Api.multipartPost(
      'media/multiple/media',
      actions.addProjectImageSuccess,
      actions.addProjectImageFailure,
      {},
      { document: action.payload.files },
      token,
    ),
  );
}

function* deleteProjectTypeImage(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.delete(
      `media/${action.payload.id}`,
      actions.deleteProjectImageSuccess,
      actions.deleteProjectImageFailure,
      token,
    ),
  );
}

function* loadAgentsByAgency(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `agency/getAgentOfAgency/${action.payload}`,
      actions.loadAgentsByAgencySuccess,
      actions.loadAgentsByAgencyFailure,
      token,
    ),
  );
}

function* addProjectTypeFloorImage(action) {
  const token = yield select(makeSelectToken());
  // const media = yield select(makeSelectPaymentPlan());
  yield call(
    Api.multipartPost(
      'media/multiple/media',
      actions.addProjectFloorImageSuccess,
      actions.addProjectFloorImageFailure,
      {},
      { document: action.payload.files },
      token,
    ),
  );
}

function* autoSave() {
  // const successWatcher = yield fork(redirectOnSuccess);
  const token = yield select(makeSelectToken());
  const data = yield select(makeSelectOne());
  // const media_id = data.media.images.map(each => each.id._id);
  const image_id = data.media.images.map(function image(each) {
    return {
      id: each.id._id,
      caption: each.caption,
    };
  });
  let main_data = {};

  const trimmedPrice = {
    ...data.price,
    value:
      (data.price &&
        data.price.value &&
        data.price.value.toString().replace(/,/g, '')) ||
      '',
  };

  if (data.is_project) {
    const payment_id = data.project_payment_plan.map(function paymeny(each) {
      return {
        image: each.image._id,
        title: each.title,
      };
    });
    const project_type = data.project_property_type;

    const new_project_type = [];
    for (let index = 0; index < project_type.length; index++) {
      const image = [...project_type[index].image];
      let project_image = [];
      if (image.length > 0) {
        project_image = image.map(function paymeny(each) {
          return each._id;
        });

        new_project_type[index] = {
          ...data.project_property_type[index],
          image: project_image,
        };
      } else {
        new_project_type[index] = {
          ...data.project_property_type[index],
        };
      }
    }
    main_data = {
      ...data,
      media: {
        images: [...image_id],
        youtube_video_id: data.media.youtube_video_id,
      },
      project_payment_plan: [...payment_id],
      project_property_type: [...new_project_type],
      is_save: false,
    };
  } else {
    main_data = {
      ...data,
      price: trimmedPrice,
      media: {
        images: [...image_id],
        youtube_video_id: data.media.youtube_video_id,
      },
      is_save: false,
    };
  }
  yield fork(
    Api.post(
      'property',
      actions.autoSaveSuccess,
      actions.autoSaveFailure,
      main_data,
      token,
    ),
  );
  // yield take([LOCATION_CHANGE, types.ADD_EDIT_FAILURE]);
  // yield cancel(successWatcher);
}

// Individual exports for testing
export default function* propertySaga() {
  yield takeLatest(types.LOAD_ALL_REQUEST, loadAll);
  yield takeLatest(types.LOAD_ONE_REQUEST, loadOne);
  yield takeLatest(types.ADD_EDIT_REQUEST, addEdit);
  yield takeLatest(types.DELETE_ONE_REQUEST, deleteProperty);
  yield takeLatest(types.DELETE_ONE_SUCCESS, deleteSuccessFunc);
  yield takeLatest(types.DELETE_ONE_FAILURE, deleteFailureFunc);
  yield takeLatest(types.ADD_EDIT_FAILURE, addEditFailureFunc);
  yield takeLatest(types.ADD_EDIT_SUCCESS, addEditSuccessFunc);
  yield takeLatest(types.LOAD_ENUM_REQUEST, loadEnum);
  yield takeLatest(types.LOAD_LOCATION_REQUEST, loadLocations);
  yield takeLatest(types.LOAD_AGENTS_REQUEST, loadAgents);
  yield takeLatest(types.LOAD_DEVELOPERS_REQUEST, loadDevelopers);

  yield takeLatest(types.LOAD_STATE_REQUEST, loadState);
  yield takeLatest(types.LOAD_DISTRICT_REQUEST, loadDistrict);
  yield takeLatest(types.LOAD_MUNICIPALITY_REQUEST, loadMunicipality);
  yield takeLatest(types.LOAD_AREA_REQUEST, loadArea);

  yield takeLatest(types.ADD_MEDIA_REQUEST, addMedia);
  yield takeLatest(types.ADD_MEDIA_SUCCESS, addMediaSuccessFunc);
  yield takeLatest(types.ADD_MEDIA_FAILURE, addMediaFailureFunc);
  yield takeLatest(types.DELETE_MEDIA_REQUEST, deleteMedia);
  yield takeLatest(types.DELETE_MEDIA_SUCCESS, deleteMediaSuccessFunc);
  yield takeLatest(types.DELETE_MEDIA_FAILURE, deleteMediaFailureFunc);

  yield takeLatest(types.ADD_FLOOR_PLAN_REQUEST, addFloorPlan);
  yield takeLatest(types.ADD_FLOOR_PLAN_SUCCESS, addFloorPlanSuccessFunc);
  yield takeLatest(types.ADD_FLOOR_PLAN_FAILURE, addFloorPlanFailureFunc);
  yield takeLatest(types.DELETE_FLOOR_PLAN_REQUEST, deleteFloorPlan);
  yield takeLatest(types.DELETE_FLOOR_PLAN_SUCCESS, deleteFloorPlanSuccessFunc);
  yield takeLatest(types.DELETE_FLOOR_PLAN_FAILURE, deleteFloorPlanFailureFunc);

  yield takeLatest(types.ADD_PAYMENT_PLAN_REQUEST, addPaymentPlan);
  yield takeLatest(types.ADD_PAYMENT_PLAN_SUCCESS, addPaymentPlanSuccessFunc);
  yield takeLatest(types.ADD_PAYMENT_PLAN_FAILURE, addPaymentPlanFailureFunc);
  yield takeLatest(types.DELETE_PAYMENT_PLAN_REQUEST, deletePaymentPlan);
  yield takeLatest(
    types.DELETE_PAYMENT_PLAN_SUCCESS,
    deletePaymentPlanSuccessFunc,
  );
  yield takeLatest(
    types.DELETE_PAYMENT_PLAN_FAILURE,
    deletePaymentPlanFailureFunc,
  );
  yield takeLatest(types.LOAD_USER_STATUS_REQUEST, loadUserStatus);

  yield takeLatest(types.ADD_PROJECT_TYPE_IMAGE_REQUEST, addProjectTypeImage);
  yield takeLatest(
    types.DELETE_PROJECT_TYPE_IMAGE_REQUEST,
    deleteProjectTypeImage,
  );

  yield takeLatest(types.LOAD_AGENTS_BY_AGENCY_REQUEST, loadAgentsByAgency);

  yield takeLatest(
    types.ADD_PROJECT_TYPE_FLOOR_IMAGE_REQUEST,
    addProjectTypeFloorImage,
  );

  yield takeLatest(types.AUTO_SAVE_REQUEST, autoSave);
}
