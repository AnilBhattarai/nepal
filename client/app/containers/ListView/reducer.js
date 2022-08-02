/*
 *
 * ListView reducer
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
  one: {
    basic: {
      title: '',
      description: '',
      slug_url: '',
      property_purpose: {
        title: '',
      }, // For Sale, Rent, Lease
      property_type: {
        title: '',
      }, // Residential, Plots, Commercial
      property_category: {
        title: '',
      }, // House, Land, Flat, Apartment, Business, Office Space , Hostel
    },
    address: {
      state_id: {
        state_name: '',
      }, // enum
      district_id: {
        district_name: '',
      }, // enum
      city_id: {
        municipality_name: '',
      }, // enum
      area_id: {
        area_name: '',
      }, // enum
      house_no: '',
    },
    // location: {
    //   zoom: 0,
    //   type: {
    //     type: 'Point',
    //     coordinates: [],
    //   },
    //   required: false,
    // },
    location_property: {
      total_area_unit: {
        title: '',
      }, // enum
      total_area: '',
      built_area: '',
      built_area_unit: {
        title: '',
      }, // enum
      property_face: {
        title: '',
      }, // enum
      road_access_value: 0,
      road_access_length_unit: {
        title: '',
      }, // enum
      road_access_road_type: {
        title: '',
      }, // enum
    },
    building: {
      built_year: 0,
      built_month: 0,
      calender_type: '', // AD,BS
      total_floor: 0,
      furnishing: '', // Full,Semi,Un
      no_of: {
        kitchen: 1,
        dinningroom: 1,
        bedroom: 1,
        bathroom: 1,
        hall: 1,
      },
      parking: '',
      amenities: [], // enum
    },
    media: {
      images: [],
      youtube_video_id: '',
    },
    price: {
      value: 0,
      currency: {
        title: '',
      }, // enum
      label: {
        title: '',
      }, // Per Ana, Per SqFeet
    },
    is_active: false,
    is_featured: false,
    is_premium: false,
    is_negotiable: false,
    tags: [],
  },
  loading: false,
  loading_one: true,
  offer_loading: false,
  agent: {},
  developer: {},
  offer: {
    name: '',
    email: '',
    phone: '',
    message: '',
  },
  errors: { name: '', email: '', phone: '', message: '' },
  offerForm: false,
  favorite: {
    is_favourite: false,
    property_id: '',
  },
  favorite_loading: false,
  related: [],
  feedback: {
    property_id: '',
    is_listing_correct: false,
    reason: [],
    description: '',
    mobile_no: '',
    email: '',
  },
  feedback_loading: false,
  feedbackErrors: {},
  complain_type: [],
  options: {},
  feedbackForm: false,
  openForm: false,
};

/* eslint-disable default-case, no-param-reassign */
const listViewReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_ALL_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ALL_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_ALL_SUCCESS:
        draft.all = action.payload;
        draft.loading = false;
        break;
      case types.SET_ONE_VALUE:
        draft.one[action.payload.key] = action.payload.value;
        draft.errors[action.payload.errors] = ' ';
        break;
      case types.CLEAR_ONE:
        draft.one = initialState.one;
        draft.offer = initialState.offer;
        break;
      case types.CLEAR_OFFER:
        draft.offer = initialState.offer;
        draft.errors = initialState.errors;

        break;
      case types.CLEAR_DEV_AGENT:
        draft.agent = initialState.agent;
        draft.developer = initialState.developer;
        break;
      case types.LOAD_ONE_REQUEST:
        draft.loading_one = true;
        break;
      case types.LOAD_ONE_FAILURE:
        draft.loading_one = false;
        draft.one.msg = action.payload.msg;
        break;
      case types.LOAD_ONE_SUCCESS:
        draft.loading_one = false;
        draft.one = action.payload.data.properties;
        draft.related = action.payload.data.otherRelatedProperty;
        break;
      case types.LOAD_AGENCY_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_AGENCY_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_AGENCY_SUCCESS:
        // console.log('from reducer', action.payload);
        draft.agent = action.payload.data;
        // draft.loading = false;
        break;
      case types.LOAD_DEVELOPER_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_DEVELOPER_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_DEVELOPER_SUCCESS:
        // console.log('from reducer', action.payload);
        draft.developer = action.payload.data;
        draft.loading = false;
        break;
      case types.SET_OFFER_VALUE:
        draft.offer[action.payload.key] = action.payload.value;
        break;
      case types.SET_OFFER_FORM:
        draft.offerForm = action.payload;
        break;
      case types.MAKE_OFFER_REQUEST:
        draft.offer_loading = true;
        break;
      case types.MAKE_OFFER_FAILURE:
        draft.errors = action.payload.errors;
        draft.offer_loading = false;

        break;
      case types.MAKE_OFFER_SUCCESS:
        draft.offer = initialState.offer;
        draft.offer_loading = false;
        draft.offerForm = false;
        draft.errors = initialState.errors;
        break;
      case types.SET_FAVORITE_VALUE:
        draft.favorite_loading = true;
        break;
      case types.SET_FAVORITE_FAILURE:
        draft.favorite_loading = false;

        break;
      case types.SET_FAVORITE_SUCCESS:
        console.log('favorete success', action.payload);
        draft.favorite.is_favourite = action.payload.data.is_favourite;
        draft.favorite_loading = false;

        break;

      case types.LOAD_FAVORITE_REQUEST:
        draft.favorite_loading = true;
        break;
      case types.LOAD_FAVORITE_FAILURE:
        draft.favorite_loading = false;
        break;
      case types.LOAD_FAVORITE_SUCCESS:
        draft.favorite = action.payload.data;
        draft.favorite_loading = false;
        break;

      case types.SET_FEEDBACK_VALUE:
        draft.feedback[action.payload.key] = action.payload.value;
        break;

      case types.SET_OPTIONS_VALUE:
        draft.options[action.payload.key] = action.payload.value;
        break;

      case types.POST_FEEDBACK_REQUEST:
        draft.feedback_loading = true;
        break;
      case types.POST_FEEDBACK_FAILURE:
        draft.feedbackErrors = action.payload.errors;
        draft.feedback_loading = false;

        break;
      case types.POST_FEEDBACK_SUCCESS:
        draft.feedback = initialState.feedback;
        draft.feedback_loading = false;
        draft.feedbackForm = false;
        draft.feedbackErrors = initialState.feedbackErrors;
        draft.options = initialState.options;
        break;

      case types.LOAD_COMPLAIN_TYPE_REQUEST:
        draft.feedback_loading = true;
        break;
      case types.LOAD_COMPLAIN_TYPE_FAILURE:
        draft.feedback_loading = false;
        break;
      case types.LOAD_COMPLAIN_TYPE_SUCCESS:
        draft.complain_type = action.payload.data.complain_type;
        draft.feedback_loading = false;
        break;

      case types.SET_FEEDBACK_FORM:
        draft.feedbackForm = action.payload;
        break;

      case types.CLEAR_FEEDBACK_VALUE:
        draft.feedback = {
          ...draft.feedback,
          reason: [],
          description: '',
          mobile_no: '',
          email: '',
        };
        draft.feedbackErrors = initialState.feedbackErrors;

        break;

      case types.SET_FORM_OPEN:
        draft.openForm = action.payload;
        break;

      case types.LOAD_MORE_REQUEST:
        draft.loading_more = true;
        break;
      case types.LOAD_MORE_FAILURE:
        draft.loading_more = false;
        break;
      case types.LOAD_MORE_SUCCESS:
        const newData = draft.all.data.concat(action.payload.data);
        draft.all = { ...action.payload, data: newData };
        draft.loading_more = false;
        break;

      case types.SAVE_SEARCH_REQUEST:
        draft.offer_loading = true;
        break;
      case types.SAVE_SEARCH_FAILURE:
        draft.offer_loading = false;
        break;
      case types.SAVE_SEARCH_SUCCESS:
        draft.offer_loading = false;
        break;
    }
  });

export default listViewReducer;
