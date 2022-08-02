/*
 *
 * Dashboard reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  users: {
    data: [],
    totaldata: 0,
  },
  errors: {
    data: [],
    totaldata: 0,
  },
  info: [],
  blog: [],
  total_properties: [],
  month_properties: [],
  category_properties: [],
  posts_by_authors: [],
  user_count: [],
  top_agent: [],
  top_areas: [],
  sold_count: {},
  properties_by_price: [],
  pending: {},
  loaders: {
    total_loading: false,
    month_loading: false,
    category_loading: false,
    posts_loading: false,
    user_loading: false,
    top_agent_loading: false,
    top_areas_loading: false,
    sold_loading: false,
    price_loading: false,
    pending_loading: false,
    users_loading: false,
    error_loading: false,
    info_loading: false,
    blog_loading: false,
  },
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_USER_REQUEST:
        draft.loaders.users_loading = true;
        break;

      case types.LOAD_USER_FAILURE:
        draft.loaders.users_loading = false;
        break;
      case types.LOAD_USER_SUCCESS:
        draft.users = action.payload;
        draft.loaders.users_loading = false;
        break;

      case types.LOAD_ERROR_REQUEST:
        draft.loaders.error_loading = true;
        break;

      case types.LOAD_ERROR_FAILURE:
        draft.loaders.error_loading = false;
        break;

      case types.LOAD_ERROR_SUCCESS:
        draft.errors = action.payload;
        draft.loaders.error_loading = false;
        break;

      case types.LOAD_INFO_REQUEST:
        draft.loaders.info_loading = true;
        break;

      case types.LOAD_INFO_FAILURE:
        draft.loaders.info_loading = false;
        break;

      case types.LOAD_INFO_SUCCESS:
        draft.info = action.payload.data;
        draft.loaders.info_loading = false;
        break;

      case types.LOAD_BLOG_REQUEST:
        draft.loaders.blog_loading = true;
        break;

      case types.LOAD_BLOG_FAILURE:
        draft.loaders.blog_loading = false;
        break;
      case types.LOAD_BLOG_SUCCESS:
        draft.blog = action.payload.data;
        draft.loaders.blog_loading = false;
        break;

      case types.LOAD_TOTAL_PROPERTIES_REQUEST:
        draft.loaders.total_loading = true;
        break;

      case types.LOAD_TOTAL_PROPERTIES_FAILURE:
        draft.loaders.total_loading = false;
        break;

      case types.LOAD_TOTAL_PROPERTIES_SUCCESS:
        draft.total_properties = action.payload.data;
        draft.loaders.total_loading = false;

        break;

      case types.LOAD_MONTH_PROPERTIES_REQUEST:
        draft.loaders.month_loading = true;
        break;

      case types.LOAD_MONTH_PROPERTIES_FAILURE:
        draft.loaders.month_loading = false;
        break;

      case types.LOAD_MONTH_PROPERTIES_SUCCESS:
        draft.month_properties = action.payload.data;
        draft.loaders.month_loading = false;
        break;

      case types.LOAD_CATEGORY_PROPERTIES_REQUEST:
        draft.loaders.category_loading = true;
        break;

      case types.LOAD_CATEGORY_PROPERTIES_FAILURE:
        draft.loaders.category_loading = false;
        break;

      case types.LOAD_CATEGORY_PROPERTIES_SUCCESS:
        draft.category_properties = action.payload.data;
        draft.loaders.category_loading = false;
        break;

      case types.LOAD_POSTS_BY_AUTHOR_REQUEST:
        draft.loaders.posts_loading = true;
        break;

      case types.LOAD_POSTS_BY_AUTHOR_FAILURE:
        draft.loaders.posts_loading = false;
        break;

      case types.LOAD_POSTS_BY_AUTHOR_SUCCESS:
        draft.posts_by_authors = action.payload.data;
        draft.loaders.posts_loading = false;
        break;

      case types.LOAD_USER_SIGNUP_COUNT_REQUEST:
        draft.loaders.user_loading = true;
        break;

      case types.LOAD_USER_SIGNUP_COUNT_FAILURE:
        draft.loaders.user_loading = false;
        break;

      case types.LOAD_USER_SIGNUP_COUNT_SUCCESS:
        draft.user_count = action.payload.data;
        draft.loaders.user_loading = false;
        break;

      case types.LOAD_TOP_AGENT_REQUEST:
        draft.loaders.top_agent_loading = true;
        break;

      case types.LOAD_TOP_AGENT_FAILURE:
        draft.loaders.top_agent_loading = false;
        break;

      case types.LOAD_TOP_AGENT_SUCCESS:
        draft.top_agent = action.payload.data;
        draft.loaders.top_agent_loading = false;
        break;

      case types.LOAD_TOP_AREAS_REQUEST:
        draft.loaders.top_areas_loading = true;
        break;

      case types.LOAD_TOP_AREAS_FAILURE:
        draft.loaders.top_areas_loading = false;
        break;

      case types.LOAD_TOP_AREAS_SUCCESS:
        draft.top_areas = action.payload.data;
        draft.loaders.top_areas_loading = false;
        break;

      case types.LOAD_ACTIVE_SOLD_REQUEST:
        draft.loaders.sold_loading = true;
        break;

      case types.LOAD_ACTIVE_SOLD_FAILURE:
        draft.loaders.sold_loading = false;
        break;

      case types.LOAD_ACTIVE_SOLD_SUCCESS:
        draft.sold_count = action.payload.data;
        draft.loaders.sold_loading = false;
        break;

      case types.LOAD_PROPERTIES_BY_PRICE_REQUEST:
        draft.loaders.price_loading = true;
        break;

      case types.LOAD_PROPERTIES_BY_PRICE_FAILURE:
        draft.loaders.price_loading = false;
        break;

      case types.LOAD_PROPERTIES_BY_PRICE_SUCCESS:
        draft.properties_by_price = action.payload.data;
        draft.loaders.price_loading = false;
        break;

      case types.LOAD_PENDING_PROPERTIES_REQUEST:
        draft.loaders.pending_loading = true;
        break;

      case types.LOAD_PENDING_PROPERTIES_FAILURE:
        draft.loaders.pending_loading = false;
        break;

      case types.LOAD_PENDING_PROPERTIES_SUCCESS:
        draft.pending = action.payload.data;
        draft.loaders.pending_loading = false;

        break;
    }
  });

export default reducer;
