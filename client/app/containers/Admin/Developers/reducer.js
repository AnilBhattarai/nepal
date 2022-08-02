/*
 *
 * Developers reducer
 *
 */
import produce from 'immer';
import * as types from './constants';
import defaultImage from '../../../assets/img/logo.png';

export const initialState = {
  all: {
    data: [],
    page: 1,
    size: 10,
    totaldata: 0,
  },
  one: {
    bio: '',
    name: '',
    logo: {},
    tagline: '',
    banner: {}, //
    website: '',
    phone: [],
    email: [],
    journey: [], // { year: 0, label: '' }
    business: { title: '', sub_title: '', video_code: '' }, //
    factoids: [], // { top_label: '', value: '', button_label: '' }
    future_ready: { title: '', sub_title: '', video_code: '' }, //
    success_story: { title: '', sub_title: '', video_code: '' }, //
    address: '',
    md_name: '',
    md_post: '',
    md_message: '',
    established_year: '',
    projects_no: '',
  },
  query: {},
  filter: {},
  // query: { find_name: '', find_key: '', size: 10 },
  loading: false,
  errors: {},
  tempImage: defaultImage,
  bannerImage: defaultImage,
  tempPhone: '',
  tempEmail: '',
};

/* eslint-disable default-case, no-param-reassign */
const developersReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_ONE_VALUE:
        draft.one[action.payload.key] = action.payload.value;
        draft.errors[action.payload.errors] = ' ';
        break;
      case types.ADD_EDIT_FAILURE:
        draft.errors = action.payload.errors;
        break;
      case types.CLEAR_ERRORS:
        draft.errors = initialState.errors;
        break;
      case types.CLEAR_ONE:
        draft.one = initialState.one;
        draft.tempImage = initialState.tempImage;
        draft.bannerImage = initialState.bannerImage;
        break;
      case types.SET_QUERY_VALUE:
        draft.query[action.payload.key] = action.payload.value;
        break;
      case types.CLEAR_QUERY:
        draft.query = initialState.query;
        draft.filter = initialState.filter;
        break;

      case types.SET_FILTER_VALUE:
        draft.filter[action.payload.key] = action.payload.value;
        break;
      case types.CLEAR_FILTER:
        draft.filter = initialState.filter;
        break;

      case types.LOAD_ALL_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ALL_SUCCESS:
        draft.all = action.payload;
        draft.loading = false;
        break;

      case types.LOAD_ONE_REQUEST:
        draft.loading = false;
        break;
      case types.LOAD_ONE_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_ONE_SUCCESS:
        draft.loading = false;
        draft.one = { ...initialState.one, ...action.payload.data.data };
        break;

      case types.DELETE_ONE_SUCCESS:
        draft.all = {
          ...draft.all,
          data: draft.all.data.filter(
            each => each._id != action.payload.data._id,
          ),
        };
        break;
      case types.SET_TEMP_IMAGE_VALUE:
        draft.tempImage = action.payload;
        break;

      case types.SET_TEMP_BANNER_VALUE:
        draft.bannerImage = action.payload;
        break;

      case types.ADD_JOURNEY:
        if (draft.one.journey === null) {
          draft.one.journey = [];
        }
        draft.one.journey = [...draft.one.journey, { year: 0, label: '' }];
        break;

      case types.ADD_FACTOID:
        if (draft.one.factoids === null) {
          draft.one.factoids = [];
        }
        draft.one.factoids = [
          ...draft.one.factoids,
          { top_label: '', value: '', button_label: '' },
        ];
        break;

      case types.SET_JOURNEY_VALUE:
        draft.one.journey[action.payload.index][action.payload.key] =
          action.payload.value;
        break;

      case types.SET_FACTOID_VALUE:
        draft.one.factoids[action.payload.index][action.payload.key] =
          action.payload.value;
        break;

      case types.SET_TEMP_PHONE_VALUE:
        draft.tempPhone = action.payload;
        break;

      case types.SET_TEMP_EMAIL_VALUE:
        draft.tempEmail = action.payload;
        break;
    }
  });

export default developersReducer;
