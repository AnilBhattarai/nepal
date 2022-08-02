import { takeLatest, call, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadPropertyCategory(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `enum/property_category?size=6`,
      actions.loadPropertyCategorySuccess,
      actions.loadPropertyCategoryFailure,
      token,
    ),
  );
}

function* loadDirectory(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `enum/service_category?size=1000&&1order`,
      actions.loadDirectorySuccess,
      actions.loadDirectoryFailure,
      token,
    ),
  );
}

function* loadCollection(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `enum/useful_collections?size=1000&&sort=1order`,
      actions.loadCollectionSuccess,
      actions.loadCollectionFailure,
      token,
    ),
  );
}

// Individual exports for testing
export default function* homeComponentsSaga() {
  yield takeLatest(types.LOAD_PROPERTY_CATEGORY_REQUEST, loadPropertyCategory);
  yield takeLatest(types.LOAD_DIRECTORY_REQUEST, loadDirectory);
  yield takeLatest(types.LOAD_COLLECTION_REQUEST, loadCollection);
}
