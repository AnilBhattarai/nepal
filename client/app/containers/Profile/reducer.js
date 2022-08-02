import produce from 'immer';
import * as types from './constants';
import defaultImage from '../../assets/img/logo.png';

export const initialState = {
  one: {
    name: '',
    email: '',
    roles: [],
    avatar: null,
    date_of_birth: '',
    email_verified: true,
    image: {},
    mobile_no: '',
    social_link: {
      fb: '',
      twitter: '',
      linkedIn: '',
    },
  },
  agency: [],
  developers: [],

  agentData: {
    agent: '',
    bio: '',
    is_apply: false,
    is_verified: false,
  },
  builderData: {
    bio: '',
    name: '',
    logo: {},
    tagline: '',
    banner: {}, //
    website: '',
    phone: '',
    email: '',
    journey: [], // { year: 0, label: '' }
    business: { title: '', sub_title: '', video_code: '' }, //
    factoids: [], // { top_label: '', value: '', button_label: '' }
    future_ready: { title: '', sub_title: '', video_code: '' }, //
    success_story: { title: '', sub_title: '', video_code: '' }, //
    address: '',
    is_apply: false,
    is_verified: false,
    md_name: '',
    md_post: '',
    md_message: '',
  },
  authorData: {
    bio: '',
    is_apply: false,
    is_verified: false,
  },
  changePassword: '',
  errors: {},
  agencyErrors: {},
  newAgency: {
    title: '',
    slug_url: '',
    email: '',
    phone: '',
    address: '',
    mobile: '',
    description: '',
    logo: defaultImage,
  },
  developersErrors: {},
  newDeveloper: {
    bio: '',
    name: '',
    logo: {},
    tagline: '',
    banner: {}, //
    website: '',
    phone: '',
    email: '',
    journey: [], // { year: 0, label: '' }
    business: { title: '', sub_title: '', video_code: '' }, //
    factoids: [], // { top_label: '', value: '', button_label: '' }
    future_ready: { title: '', sub_title: '', video_code: '' }, //
    success_story: { title: '', sub_title: '', video_code: '' }, //
    address: '',
    is_active: true,
  },
  dashboardInfo: {},
  loading: false,
  token: false,
  verification_code: '',
  openAgencyForm: false,
  offer_messages: {
    data: [],
    page: 1,
    size: 10,
    totaldata: 0,
  },
  offer_loading: false,
  new_offer_loading: false,
  message: '',
  loaders: {
    category_loading: false,
    location_loading: false,
    agent_loading: false,
  },
  category_report: [],
  location_report: [],
  agent_report: [],
  lead: {
    data: [],
    page: 1,
    size: 10,
    totaldata: 0,
  },
  query: { find_channel: 'Contact_Form' },
  open: false,
  status_loading: false,
  lead_one: {
    name: '',
    inquiry: '',
    channel: '', // enum: ['Contact_Form', 'Facebook', 'Property_Inquiries', 'Via_Phone'] },
    email: '', //Contact_Form,Property_Inquiries
    phone_no: '', //via Phone, Contact Form, 'Property_Inquiries'
    profile_link: '', // Facebook
    date: '',
    is_active: false,
  },
  saved: {
    data: [],
    page: 1,
    size: 10,
    totaldata: 0,
  },
};

/* eslint-disable default-case, no-param-reassign */
const userPersonalInformationPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.CLEAR_AGENCY:
        draft.newAgency = initialState.newAgency;
        break;
      case types.CLEAR_DEVELOPER:
        draft.newDeveloper = initialState.newDeveloper;
        break;
      case types.SET_ONE_VALUE:
        draft.one[action.payload.key] = action.payload.value;
        break;
      case types.SET_QUERY_VALUE:
        draft.query[action.payload.key] = action.payload.value;
        break;
      case types.SET_SOCIAL_VALUE:
        draft.one.social_link[action.payload.key] = action.payload.value;
        break;
      case types.SET_AGENT_VALUE:
        draft.agentData[action.payload.key] = action.payload.value;
        break;
      case types.SET_BUILDER_VALUE:
        draft.builderData[action.payload.key] = action.payload.value;
        break;
      case types.SET_AUTHOR_VALUE:
        draft.authorData[action.payload.key] = action.payload.value;
        break;
      case types.SET_NEW_AGENCY_VALUE:
        draft.newAgency[action.payload.key] = action.payload.value;
        break;
      case types.SET_NEW_DEVELOPER_VALUE:
        draft.newDeveloper[action.payload.key] = action.payload.value;
        break;
      case types.SET_NEW_DEVELOPER:
        draft.newDeveloper = {
          ...initialState.newDeveloper,
          ...action.payload,
        };
        break;
      case types.SET_CODE_VALUE:
        draft.verification_code = action.payload.value;
        break;
      case types.CLEAR_CODE:
        draft.verification_code = initialState.verification_code;
        break;
      case types.ADD_EDIT_FAILURE:
        draft.loading = false;
        draft.errors = action.payload.errors;
        draft.message = action.payload.msg;

        break;
      case types.ADD_AGENCY_FAILURE:
        draft.loading = false;
        draft.agencyErrors = action.payload.errors;
        draft.openAgencyForm = true;
        draft.message = action.payload.msg;

        break;
      case types.ADD_AGENCY_SUCCESS:
        draft.loading = false;
        draft.agencyErrors = initialState.agencyErrors;
        draft.openAgencyForm = false;
        break;
      case types.ADD_DEVELOPER_FAILURE:
        draft.loading = false;
        draft.developersErrors = action.payload.errors;
        draft.message = action.payload.msg;

        break;
      case types.LOAD_ONE_REQUEST:
        draft.loading = true;
        draft.message = '';
        break;
      case types.DASHBOARD_INFO_SUCCESS:
        draft.loading = false;
        draft.dashboardInfo = action.payload.data;
        break;
      case types.DASHBOARD_INFO_FAILURE:
        draft.loading = false;
        draft.message = action.payload.msg;

        break;
      case types.DASHBOARD_INFO_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ONE_SUCCESS:
        draft.loading = false;
        draft.one = { ...initialState.one, ...action.payload.data };
        draft.email_verified = action.payload.data.email_verified;
        break;
      case types.LOAD_ONE_FAILURE:
        draft.loading = false;
        draft.message = action.payload.msg;

        break;
      case types.LOAD_AGENCY_SUCCESS:
        draft.loading = false;
        draft.agency = action.payload.data;
        break;
      case types.LOAD_DEVELOPER_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_DEVELOPER_SUCCESS:
        draft.loading = false;
        draft.developers = action.payload.data;
        break;
      case types.AGENT_DATA_SUCCESS:
        draft.loading = false;
        draft.agentData = action.payload.data;
        break;
      case types.AGENT_DATA_FAILURE:
        draft.loading = false;
        draft.message = action.payload.msg;

        break;
      case types.AGENT_DATA_REQUEST:
        draft.loading = true;
        break;
      case types.BUILDER_DATA_SUCCESS:
        draft.loading = false;
        draft.builderData = {
          ...initialState.builderData,
          ...action.payload.data,
        };
        break;
      case types.BUILDER_DATA_FAILURE:
        draft.loading = false;
        draft.message = action.payload.msg;

        break;
      case types.BUILDER_DATA_REQUEST:
        draft.loading = true;
        break;
      case types.AUTHOR_DATA_SUCCESS:
        draft.loading = false;
        draft.authorData = action.payload.data;
        break;
      case types.AUTHOR_DATA_FAILURE:
        draft.loading = false;
        break;
      case types.AUTHOR_DATA_REQUEST:
        draft.loading = true;
        break;
      case types.CHANGE_PASSWORD_SUCCESS:
        draft.changePassword = initialState;
        break;
      case types.CHANGE_PASSWORD_FAILURE:
        draft.errors = action.payload.errors;
        break;
      case types.VERIFY_EMAIL_SUCCESS:
        localStorage.setItem(
          'token',
          action.payload.token || localStorage.token,
        );
        draft.one.email_verified = true;
        draft.token = true;
        break;
      case types.ADD_PHOTO_REQUEST:
        draft.loading = true;
        break;
      case types.ADD_PHOTO_SUCCESS:
        draft.one = { ...draft.one, image: { ...action.payload.data.image } };
        draft.loading = false;
        break;
      case types.ADD_PHOTO_FAILURE:
        draft.loading = false;
        break;

      case types.ADD_JOURNEY:
        draft.newDeveloper.journey = [
          ...draft.newDeveloper.journey,
          { year: 0, label: '' },
        ];
        break;

      case types.ADD_FACTOID:
        draft.newDeveloper.factoids = [
          ...draft.newDeveloper.factoids,
          { top_label: '', value: '', button_label: '' },
        ];
        break;

      case types.SET_JOURNEY_VALUE:
        draft.newDeveloper.journey[action.payload.index][action.payload.key] =
          action.payload.value;
        break;

      case types.SET_FACTOID_VALUE:
        draft.newDeveloper.factoids[action.payload.index][action.payload.key] =
          action.payload.value;
        break;

      case types.SET_OPEN_AGENCY_FORM:
        draft.openAgencyForm = action.payload;
        break;

      case types.LOAD_OFFER_MSG_REQUEST:
        draft.offer_loading = true;
        break;
      case types.LOAD_OFFER_MSG_SUCCESS:
        draft.offer_loading = false;
        draft.offer_messages = action.payload;
        break;
      case types.LOAD_OFFER_MSG_FAILURE:
        draft.offer_loading = false;
        draft.message = action.payload.msg;

        break;

      case types.LOAD_NEW_OFFER_MSG_REQUEST:
        draft.new_offer_loading = true;
        break;
      case types.LOAD_NEW_OFFER_MSG_SUCCESS:
        draft.new_offer_loading = false;
        const newData = draft.offer_messages.data.concat(action.payload.data);
        draft.offer_messages = { ...action.payload, data: newData };
        break;
      case types.LOAD_NEW_OFFER_MSG_FAILURE:
        draft.new_offer_loading = false;
        break;

      case types.CLEAR_MESSAGE:
        draft.message = '';
        break;

      case types.LOAD_CATEGORY_REPORT_REQUEST:
        draft.loaders.category_loading = true;
        break;
      case types.LOAD_CATEGORY_REPORT_SUCCESS:
        draft.loaders.category_loading = false;
        draft.category_report = action.payload.data;
        break;
      case types.LOAD_CATEGORY_REPORT_FAILURE:
        draft.loaders.category_loading = false;
        break;

      case types.LOAD_LOCATION_REPORT_REQUEST:
        draft.loaders.location_loading = true;
        break;
      case types.LOAD_LOCATION_REPORT_SUCCESS:
        draft.loaders.location_loading = false;
        draft.location_report = action.payload.data;
        break;
      case types.LOAD_LOCATION_REPORT_FAILURE:
        draft.loaders.location_loading = false;
        break;

      case types.LOAD_AGENT_REPORT_REQUEST:
        draft.loaders.agent_loading = true;
        break;
      case types.LOAD_AGENT_REPORT_SUCCESS:
        draft.loaders.agent_loading = false;
        draft.agent_report = action.payload.data;
        break;
      case types.LOAD_AGENT_REPORT_FAILURE:
        draft.loaders.agent_loading = false;
        break;

      case types.LOAD_LEAD_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_LEAD_SUCCESS:
        draft.lead = action.payload;
        draft.loading = false;
        break;

      case types.LOAD_LEAD_FAILURE:
        draft.loading = false;
        break;

      case types.SET_OPEN:
        draft.open = action.payload;
        break;

      case types.SET_LEAD_STATUS_REQUEST:
        draft.status_loading = true;
        break;
      case types.SET_LEAD_STATUS_SUCCESS:
        draft.open = false;
        draft.status_loading = false;
        break;

      case types.SET_LEAD_STATUS_FAILURE:
        draft.status_loading = false;
        break;

      case types.ADD_LEAD_REQUEST:
        draft.loading = true;
        break;
      case types.ADD_LEAD_SUCCESS:
        draft.loading = false;
        break;

      case types.ADD_LEAD_FAILURE:
        draft.loading = false;
        draft.errors = action.payload.errors;
        break;

      case types.SET_LEAD_ONE:
        draft.lead_one[action.payload.key] = action.payload.value;
        break;
      case types.CLEAR_ONE:
        draft.lead_one = initialState.lead_one;
        break;

      case types.LOAD_SAVED_SEARCHES_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_SAVED_SEARCHES_SUCCESS:
        draft.saved = action.payload;
        draft.loading = false;
        break;

      case types.LOAD_SAVED_SEARCHES_FAILURE:
        draft.loading = false;
        break;

      case types.DELETE_SAVED_SEARCHES_SUCCESS:
        draft.saved = {
          ...draft.saved,
          data: draft.saved.data.filter(
            each => each._id != action.payload.data._id,
          ),
        };
        break;
    }
  });

export default userPersonalInformationPageReducer;
