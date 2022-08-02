import { takeLatest, call, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadUser(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'user/grby',
      actions.loadUserSuccess,
      actions.loadUserFailure,
      token,
    ),
  );
}
function* loadErrors() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'bug/grby',
      actions.loadErrorSuccess,
      actions.loadErrorFailure,
      token,
    ),
  );
}
function* loadInfo() {
  const token = yield select(makeSelectToken());
  // yield call(
  //   Api.get1(
  //     'documentation/latestinfo',
  //     actions.loadInfoSuccess,
  //     actions.loadInfoFailure,
  //     token,
  //   ),
  // );
}
function* loadBlog() {
  const token = yield select(makeSelectToken());
  // yield call(
  //   Api.get1(
  //     'documentation/latestblog',
  //     actions.loadBlogSuccess,
  //     actions.loadBlogFailure,
  //     token,
  //   ),
  // );
}

function* loadTotalProperties(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'report/property/total',
      actions.loadTotalPropertiesSuccess,
      actions.loadTotalPropertiesFailure,
      token,
    ),
  );
}

function* loadMonthProperties(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'report/property/entry/30',
      actions.loadMonthPropertiesSuccess,
      actions.loadMonthPropertiesFailure,
      token,
    ),
  );
}

function* loadCategoryProperties(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'report/property/category',
      actions.loadCategoryPropertiesSuccess,
      actions.loadCategoryPropertiesFailure,
      token,
    ),
  );
}

function* loadPostsByAuthor(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'report/blog/author',
      actions.loadPostsByAuhtorSuccess,
      actions.loadPostsByAuhtorFailure,
      token,
    ),
  );
}

function* loadUserSignUpCount(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'report/user/signup/30',
      actions.loadUserSignUpCountSuccess,
      actions.loadUserSignUpCountFailure,
      token,
    ),
  );
}

function* loadTopAgent(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'report/property/top/agent',
      actions.loadTopAgentSuccess,
      actions.loadTopAgentFailure,
      token,
    ),
  );
}

function* loadTopAreas(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'report/property/top/area/10',
      actions.loadTopAreasSuccess,
      actions.loadTopAreasFailure,
      token,
    ),
  );
}

function* loadActiveSold(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'report/property/active-vs-sold',
      actions.loadActiveSoldSuccess,
      actions.loadActiveSoldFailure,
      token,
    ),
  );
}

function* loadPropertiesByPrice(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'report/property/price/segment',
      actions.loadPropertiesByPriceSuccess,
      actions.loadPropertiesByPriceFailure,
      token,
    ),
  );
}

function* loadPendingProperties(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'report/property/pending/verify',
      actions.loadPendingPropertiesSuccess,
      actions.loadPendingPropertiesFailure,
      token,
    ),
  );
}

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_USER_REQUEST, loadUser);
  yield takeLatest(types.LOAD_ERROR_REQUEST, loadErrors);
  yield takeLatest(types.LOAD_INFO_REQUEST, loadInfo);
  yield takeLatest(types.LOAD_BLOG_REQUEST, loadBlog);
  yield takeLatest(types.LOAD_TOTAL_PROPERTIES_REQUEST, loadTotalProperties);
  yield takeLatest(types.LOAD_MONTH_PROPERTIES_REQUEST, loadMonthProperties);
  yield takeLatest(
    types.LOAD_CATEGORY_PROPERTIES_REQUEST,
    loadCategoryProperties,
  );
  yield takeLatest(types.LOAD_POSTS_BY_AUTHOR_REQUEST, loadPostsByAuthor);
  yield takeLatest(types.LOAD_USER_SIGNUP_COUNT_REQUEST, loadUserSignUpCount);
  yield takeLatest(types.LOAD_TOP_AGENT_REQUEST, loadTopAgent);
  yield takeLatest(types.LOAD_TOP_AREAS_REQUEST, loadTopAreas);
  yield takeLatest(types.LOAD_ACTIVE_SOLD_REQUEST, loadActiveSold);
  yield takeLatest(
    types.LOAD_PROPERTIES_BY_PRICE_REQUEST,
    loadPropertiesByPrice,
  );
  yield takeLatest(
    types.LOAD_PENDING_PROPERTIES_REQUEST,
    loadPendingProperties,
  );
}
