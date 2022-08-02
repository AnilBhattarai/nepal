/*
 *
 * DevelopersPage reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  all: {
    data: [],
    page: 1,
    size: 10,
    totaldata: 0,
  },
  loading: false,
  developer: {
    bio: '',
    name: '',
    logo: {},
    tagline: '',
    banner: {}, //
    website: '',
    phone: '',
    email: '',
    journey: [],
    factoids: [], // { top_label: '', value: '', button_label: '' }
    address: '',
    business: { title: '', sub_title: '', video_code: '' },
    future_ready: { title: '', sub_title: '', video_code: '' },
    success_story: { title: '', sub_title: '', video_code: '' },
    md_name: '',
    md_post: '',
    md_message: '',
  },
  builders: [],
  form: { name: '', email: '', phone: '', message: '', developer_id: '' },
  errors: {},
  form_loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const developersPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_DEVELOPER_REQUEST:
        draft.loading = true;
        draft.errors = initialState.errors;
        draft.form = initialState.form;
        break;
      case types.LOAD_DEVELOPER_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_DEVELOPER_SUCCESS:
        draft.all = action.payload;
        draft.loading = false;
        break;
      case types.LOAD_DEVELOPER_DETAIL_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_DEVELOPER_DETAIL_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_DEVELOPER_DETAIL_SUCCESS:
        draft.developer = {
          ...initialState.developer,
          ...action.payload.data.data,
        };
        draft.builders = action.payload.data.builder;
        draft.loading = false;
        draft.form.developer_id = action.payload.data.data._id;
        break;
      case types.SET_FORM_VALUE:
        draft.form[action.payload.key] = action.payload.value;
        break;

      case types.CONTACT_DEVELOPER_REQUEST:
        draft.form_loading = true;
        break;
      case types.CONTACT_DEVELOPER_FAILURE:
        draft.errors = action.payload.errors;
        draft.form_loading = false;
        break;
      case types.CONTACT_DEVELOPER_SUCCESS:
        draft.form = initialState.form;
        draft.form_loading = false;
        break;
    }
  });

export default developersPageReducer;
