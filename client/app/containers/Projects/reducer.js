/*
 *
 * Projects reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  all: {
    data: { properties: [] },
    page: 1,
    size: 10,
    totaldata: 0,
  },
  one: {
    basic: {
      title: '',
      description: '',
      slug_url: '',
      projects_purpose: {
        title: '',
      }, // For Sale, Rent, Lease
      projects_type: {
        title: '',
      }, // Residential, Plots, Commercial
      projects_category: {
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
    location_projects: {
      total_area_unit: {
        title: '',
      }, // enum
      total_area: '',
      built_area: '',
      built_area_unit: {
        title: '',
      }, // enum
      projects_face: {
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
};

/* eslint-disable default-case, no-param-reassign */
const projectsReducer = (state = initialState, action) =>
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
    }
  });

export default projectsReducer;
