/*
 *
 * ProfileProperty reducer
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
  query: {},
  filter: {},

  offers: [],
  offer_loading: false,
  offer_size: 0,
  loading_more: false,
  locations: {},
  agents: [],
  property_count: {},
};

/* eslint-disable default-case, no-param-reassign */
const profilePropertyReducer = (state = initialState, action) =>
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
        draft.property_count = action.payload.msg;
        draft.loading = false;
        break;
      case types.CLEAR_ONE:
        draft.one = initialState.one;
        break;
      case types.SET_QUERY_VALUE:
        draft.query[action.payload.key] = action.payload.value;
        break;

      case types.SET_FILTER_VALUE:
        draft.filter[action.payload.key] = action.payload.value;
        break;
      case types.LOAD_OFFER_REQUEST:
        draft.offer_loading = true;
        break;
      case types.LOAD_OFFER_FAILURE:
        draft.offer_loading = false;
        break;
      case types.LOAD_OFFER_SUCCESS:
        draft.offers = action.payload.data;
        draft.offer_size = action.payload.totaldata;
        draft.offer_loading = false;
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

      case types.LOAD_LOCATION_SUCCESS:
        draft.locations = action.payload.data;
        break;

      case types.LOAD_AGENTS_SUCCESS:
        draft.agents = action.payload.data;
        break;
    }
  });

export default profilePropertyReducer;
