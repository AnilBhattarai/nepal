/*
 *
 * Property reducer
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
    is_save: false,
    slug_url: '',
    is_sold_out: false,
    posted_by_admin: false,
    map_src: '',
    basic: {
      title: '',
      description: '',
      property_purpose: '', // For Sale, Rent, Lease
      property_type: [], // Residential, Plots, Commercial
      property_category: '', // House, Land, Flat, Apartment, Business, Office Space , Hostel
      property_ownership: '',
    },
    address: {
      state_id: '', // enum
      district_id: '', // enum
      city_id: '', // enum
      area_id: '', // enum
      house_no: '',
    },
    // location: {
    //   zoom: 0,
    //   type: {
    //     type: 'Point',
    //     coordinates: [],
    //   },
    // },
    location_property: {
      total_area_unit: '5d6797781881bf21a423ec30', // enum
      total_area: '',
      built_area: '',
      built_area_unit: '5d67bc2d86c9d12360dcf3bd', // enum
      property_face: '', // enum
      road_access_value: 0,
      road_access_length_unit: '5d6e51d8b943ac1d3c456862', // enum
      road_access_road_type: '', // enum
    },
    building: {
      built_year: '',
      built_month: 1,
      calender_type: '5d6cc52873552113c0396023', // AD,BS
      total_floor: 0,
      furnishing: '', // Full,Semi,Un
      no_of: {
        kitchen: 0,
        dinningroom: 0,
        bedroom: 0,
        bathroom: 0,
        hall: 0,
      },
      parking: '',
      amenities: [], // enum
    },
    media: {
      images: [],
      youtube_video_id: '',
    },
    // project_floor_plan: [
    //   // image: {},
    //   // title: '',
    // ],
    project_payment_plan: [],
    project_features: [],
    project_property_type: [],
    range: {
      from: '',
      to: '',
      unit: '',
    },
    unit_count: '',
    price: {
      is_price_on_call: false,
      is_starting_from: false,
      value: '',
      currency: '5d6e185db75d182a28789cb8', // enum
      label: '5dbbf428428e7d3478e86345', // Per Ana, Per SqFeet
    },
    is_by_agency: false,
    agency_id: '',
    project_status: '',
    is_active: false,
    is_featured: false,
    is_premium: false,
    is_negotiable: true,
    is_verified: false,
    tags: [],
    is_project: false,
    is_exclusive: false,
    is_agree: false,
    agent_id: '',
  },
  enums: {},
  locations: {},
  state: [],
  district: [],
  municipality: [],
  area: [],
  tempTag: '',
  filter: {},
  query: { find_title: '' },
  // query: { find_name: '', find_key: '', size: 10 },
  loading: false,
  loading_all: false,

  media_loading: false,
  address_loading: false,
  errors: {},
  added_by: '',
  added_at: '',
  temp_address: {
    state_id: '', // enum
    district_id: '', // enum
    city_id: '', // enum
    area_id: '', // enum
    house_no: '',
  },
  agents: [],
  developers: [],
  user_status: {},
  is_land: false,
  project_type_index: 0,
  project_floor_index: 0,
  agent_list: [],
  agent_loading: false,
  temp_feature: [],
  is_back: false,
  auto_loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const propertyReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_ONE_VALUE:
        draft.one[action.payload.key] = action.payload.value;
        draft.errors[action.payload.errors] = ' ';
        break;
      case types.SET_TAG_VALUE:
        draft.tempTag = action.payload;
        break;
      case types.SET_TEMP_ADDRESS:
        draft.temp_address[action.payload.key] = action.payload.value;
        break;
      case types.SET_BUILDING_VALUE:
        draft.one.building[action.payload.key] = action.payload.value;
        draft.errors[action.payload.errors] = ' ';
        break;
      case types.SET_DESCRIPTION_VALUE:
        draft.one.basic = {
          ...draft.one.basic,
          description: action.payload,
        };
        // draft.errors[action.payload.errors] = ' ';
        break;
      case types.SET_LOCATION_VALUE:
        draft.one.location[action.payload.key] = action.payload.value;
        draft.errors[action.payload.errors] = ' ';
        break;
      case types.ADD_EDIT_FAILURE:
        draft.errors = action.payload.errors;
        break;
      case types.CLEAR_ERRORS:
        draft.errors = initialState.errors;
        break;
      case types.CLEAR_FILTER:
        draft.filter = initialState.filter;
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
      case types.SET_INITIAL_QUERY_VALUE:
        draft.query[action.payload.key] = action.payload.value;
        break;
      case types.SET_IS_LAND:
        // console.log('from reducer', action.payload);
        draft.is_land = action.payload;
        break;
      case types.SET_IS_PROJECT:
        // console.log('from reducer', action.payload);
        draft.one.is_project = action.payload;
        break;
      case types.CLEAR_QUERY:
        draft.query = {};
        draft.filter = {};
        break;
      case types.LOAD_LOCATION_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_LOCATION_SUCCESS:
        draft.locations = action.payload.data;
        draft.loading = false;
        break;
      case types.LOAD_LOCATION_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_AGENTS_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ALL_REQUEST:
        draft.loading_all = true;
        break;
      case types.LOAD_ALL_SUCCESS:
        draft.all = action.payload;
        draft.loading_all = false;
        break;

      case types.LOAD_ALL_FAILURE:
        draft.loading_all = false;
        break;

      case types.LOAD_ONE_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ONE_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_ONE_SUCCESS:
        draft.loading = false;
        draft.one = action.payload.data;
        break;

      case types.DELETE_ONE_SUCCESS:
        draft.all = {
          ...draft.all,
          data: draft.all.data.filter(
            each => each._id !== action.payload.data._id,
          ),
        };
        break;
      case types.LOAD_ENUM_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ENUM_SUCCESS:
        draft.enums = action.payload.data;
        draft.loading = false;
        break;
      case types.LOAD_ENUM_FAILURE:
        draft.loading = false;
        break;

      case types.LOAD_AGENTS_SUCCESS:
        draft.agents = action.payload.data;
        draft.loading = false;
        break;
      case types.LOAD_AGENTS_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_DISTRICT_REQUEST:
        draft.address_loading = true;
        break;
      case types.LOAD_DISTRICT_SUCCESS:
        draft.district = action.payload.data;
        draft.address_loading = false;
        break;
      case types.LOAD_DISTRICT_FAILURE:
        draft.address_loading = false;
        break;
      case types.LOAD_STATE_REQUEST:
        draft.address_loading = true;
        break;
      case types.LOAD_STATE_SUCCESS:
        draft.state = action.payload.data;
        draft.address_loading = false;
        break;
      case types.LOAD_MUNICIPALITY_FAILURE:
      case types.LOAD_STATE_FAILURE:
        draft.address_loading = false;
        break;
      case types.LOAD_MUNICIPALITY_REQUEST:
        draft.address_loading = true;
        break;
      case types.LOAD_MUNICIPALITY_SUCCESS:
        draft.municipality = action.payload.data;
        draft.address_loading = false;
        break;
      case types.LOAD_AREA_REQUEST:
        draft.address_loading = true;
        break;
      case types.LOAD_AREA_SUCCESS:
        draft.area = action.payload.data;
        draft.address_loading = false;
        break;
      case types.LOAD_AREA_FAILURE:
        draft.address_loading = false;
        break;
      case types.ADD_MEDIA_REQUEST:
        draft.media_loading = true;
        break;
      case types.ADD_MEDIA_SUCCESS:
        // draft.one.media = {
        //   ...draft.one.media,
        //   images: [...draft.one.media.images, ...action.payload.data],
        // };
        draft.one.media.images = [
          ...draft.one.media.images,
          ...action.payload.data.map(function images(each) {
            return {
              id: each,
              caption: '5dc3e8d0e1daf24acd5e810d',
            };
          }),
          // {
          //   id: action.payload.data,
          //   caption: '5dc3e8d0e1daf24acd5e810d',
          // },
        ];
        draft.media_loading = false;
        break;
      case types.ADD_MEDIA_FAILURE:
        draft.media_loading = false;
        break;
      case types.DELETE_MEDIA_SUCCESS:
        draft.one.media.images = [
          ...state.one.media.images.filter(
            each => each.id._id !== action.payload,
          ),
        ];
        break;
      case types.ADD_FLOOR_PLAN_REQUEST:
        draft.media_loading = true;
        break;
      case types.ADD_FLOOR_PLAN_SUCCESS:
        draft.one.project_floor_plan = [
          ...draft.one.project_floor_plan,
          ...action.payload.data.map(function images(each) {
            return {
              image: each,
              title: '',
            };
          }),
        ];
        draft.media_loading = false;
        break;
      case types.ADD_FLOOR_PLAN_FAILURE:
        draft.media_loading = false;
        break;
      case types.DELETE_FLOOR_PLAN_SUCCESS:
        draft.one.project_floor_plan = [
          ...state.one.project_floor_plan.filter(
            each => each.image._id !== action.payload,
          ),
        ];
        break;
      case types.ADD_PAYMENT_PLAN_REQUEST:
        draft.media_loading = true;
        break;
      case types.ADD_PAYMENT_PLAN_SUCCESS:
        draft.one.project_payment_plan = [
          ...draft.one.project_payment_plan,
          ...action.payload.data.map(function images(each) {
            return {
              image: each,
              title: '',
            };
          }),
        ];
        draft.media_loading = false;
        break;
      case types.ADD_PAYMENT_PLAN_FAILURE:
        draft.media_loading = false;
        break;
      case types.DELETE_PAYMENT_PLAN_SUCCESS:
        draft.one.project_payment_plan = [
          ...state.one.project_payment_plan.filter(
            each => each.image._id !== action.payload,
          ),
        ];
        break;

      case types.SET_CAPTION:
        // console.log(
        //   'value from reducer',
        //   action.payload.index,
        //   action.payload.value,
        // );
        draft.one.media.images[action.payload.index].caption =
          action.payload.value;
        break;
      case types.SET_FLOOR_PLAN_CAPTION:
        draft.one.project_floor_plan[action.payload.index].title =
          action.payload.value;
        break;
      case types.SET_PAYMENT_PLAN_CAPTION:
        draft.one.project_payment_plan[action.payload.index].title =
          action.payload.value;
        break;
      case types.LOAD_USER_STATUS_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_USER_STATUS_SUCCESS:
        draft.user_status = action.payload.data;
        draft.loading = false;
        break;
      case types.LOAD_USER_STATUS_FAILURE:
        draft.loading = false;
        break;

      case types.ADD_PROJECT_FEATURE_REQUEST:
        draft.one.project_features = [
          ...draft.one.project_features,
          {
            feature: '',
            value: '',
          },
        ];
        break;

      case types.DELETE_PROJECT_FEATURE_REQUEST:
        draft.one.project_features = [
          ...state.one.project_features.filter(
            each => each.feature !== action.payload,
          ),
        ];
        break;
      case types.SET_PROJECT_FEATURE:
        draft.one.project_features[action.payload.index].feature =
          action.payload.value;
        break;
      case types.SET_PROJECT_VALUE:
        draft.one.project_features[action.payload.index].value =
          action.payload.value;
        break;
      case types.ADD_PROJECT_TYPE_REQUEST:
        if (draft.one.basic.property_category === '5d660cb27682d03f547a6c4a') {
          // house ko case

          draft.one.project_property_type = [
            ...draft.one.project_property_type,
            {
              type: '',
              floor_plan: [],
              image: [],
              unit_count: '',
              minimum_price: '',
              maximum_price: '',
            },
          ];
          draft.temp_feature = [...draft.temp_feature, []];
        } else if (
          draft.one.basic.property_category === '5d662c7b8f12c7035cd39315'
        ) {
          // land ko case
          draft.one.project_property_type = [
            ...draft.one.project_property_type,
            {
              area: '',
              area_option: '5d6797781881bf21a423ec30',
              price: '',
              image: [],
              unit_count: '',
              minimum_price: '',
              maximum_price: '',
            },
          ];
        } else {
          // flats and remaining categories
          draft.one.project_property_type = [
            ...draft.one.project_property_type,
            {
              type: '',
              area: '',
              area_option: '5d6797781881bf21a423ec30',
              price: '',
              total_unit: '',
              available_unit: '',
              bathroom: '',
              bedroom: '',
              kitchen: '',
              puja_room: '',
              living_room: '',
              image: [],
              floor_no: '',
              unit_count: '',
              minimum_price: '',
              maximum_price: '',
            },
          ];
        }

        break;
      case types.SET_PROJECT_TYPE:
        draft.one.project_property_type[action.payload.index][
          action.payload.name
        ] = action.payload.value;
        break;

      case types.SET_PROJECT_TYPE_FLOOR:
        draft.one.project_property_type[action.payload.index].floor_plan[
          action.payload.floor_index
        ][action.payload.name] = action.payload.value;
        break;
      case types.SET_PROJECT_AREA:
        draft.one.project_property_type[action.payload.index].area =
          action.payload.value;
        break;
      case types.SET_PROJECT_PRICE:
        draft.one.project_property_type[action.payload.index].price =
          action.payload.value;
        break;

      case types.LOAD_DEVELOPERS_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_DEVELOPERS_SUCCESS:
        draft.developers = action.payload.data;
        draft.loading = false;
        break;
      case types.LOAD_DEVELOPERS_FAILURE:
        draft.loading = false;
        break;

      case types.ADD_PROJECT_TYPE_IMAGE_REQUEST:
        console.log('REQUEST', action.payload);

        draft.media_loading = true;
        draft.project_type_index = action.payload.index;
        break;
      case types.ADD_PROJECT_TYPE_IMAGE_SUCCESS:
        draft.one.project_property_type[draft.project_type_index].image = [
          ...draft.one.project_property_type[draft.project_type_index].image,
          ...action.payload.data.map(function images(each) {
            return {
              ...each,
            };
          }),
        ];
        draft.media_loading = false;
        break;
      case types.ADD_PROJECT_TYPE_IMAGE_FAILURE:
        draft.media_loading = false;
        break;
      case types.DELETE_PROJECT_TYPE_IMAGE_REQUEST:
        console.log('DELETE REQUEST', action.payload);

        draft.media_loading = true;
        draft.project_type_index = action.payload.index;
        break;
      case types.DELETE_PROJECT_TYPE_IMAGE_SUCCESS:
        console.log('DELETE SUCCESS', action.payload);
        draft.one.project_property_type[action.payload.index].image = [
          ...state.one.project_property_type[action.payload.index].image.filter(
            each => each._id !== action.payload.id,
          ),
        ];
        draft.media_loading = false;

        break;

      case types.LOAD_AGENTS_BY_AGENCY_REQUEST:
        draft.agent_loading = true;
        break;
      case types.LOAD_AGENTS_BY_AGENCY_FAILURE:
        draft.agent_loading = false;
        break;
      case types.LOAD_AGENTS_BY_AGENCY_SUCCESS:
        draft.agent_loading = false;
        draft.agent_list = action.payload.data;
        break;

      case types.ADD_PROJECT_TYPE_FLOOR:
        const index = action.payload;

        console.log('ADD Floor plan', action.payload);

        console.log('Floor plan', state.one.project_property_type);

        draft.one.project_property_type[index].floor_plan = [
          ...state.one.project_property_type[index].floor_plan,
          {
            feature_list: [],
            floor_name: '',
            image: [],
          },
        ];

        // draft.temp_feature[index] = [...state.temp_feature[index], ''];

        break;

      case types.DELETE_PROJECT_TYPE_FLOOR:
        const chipData = [
          ...draft.one.project_property_type[action.payload.index].floor_plan,
        ];

        chipData.splice(action.payload.floor_index, 1);

        draft.one.project_property_type[
          action.payload.index
        ].floor_plan = chipData;

        break;

      case types.DELETE_PROJECT_TYPE_FEATURE_LIST:
        const chipDataList = [
          ...draft.one.project_property_type[action.payload.index].floor_plan[
            action.payload.fIndex
          ].feature_list,
        ];
        chipDataList.splice(action.payload.flIndex, 1);
        draft.one.project_property_type[action.payload.index].floor_plan[
          action.payload.fIndex
        ].feature_list = chipDataList;
        break;

      case types.DELETE_PROJECT_TYPE_FLOOR_IMAGE:
        const chipDataImage = [
          ...draft.one.project_property_type[action.payload.index].floor_plan[
            action.payload.fIndex
          ].image,
        ];
        chipDataImage.splice(action.payload.flIndex, 1);
        draft.one.project_property_type[action.payload.index].floor_plan[
          action.payload.fIndex
        ].image = chipDataImage;
        break;

      case types.ADD_PROJECT_TYPE_FLOOR_IMAGE_REQUEST:
        draft.media_loading = true;
        draft.project_type_index = action.payload.index;
        draft.project_floor_index = action.payload.floor_index;
        break;
      case types.ADD_PROJECT_TYPE_FLOOR_IMAGE_SUCCESS:
        const tempFloorImage =
          draft.one.project_property_type[draft.project_type_index].floor_plan[
            draft.project_floor_index
          ].image;

        tempFloorImage.push({ ...action.payload.data[0] });
        draft.one.project_property_type[draft.project_type_index].floor_plan[
          draft.project_floor_index
        ].image = tempFloorImage;
        draft.media_loading = false;
        break;
      case types.ADD_PROJECT_TYPE_FLOOR_IMAGE_FAILURE:
        draft.media_loading = false;
        break;

      case types.SET_PROJECT_TYPE_FLOOR_FEATURE:
        draft.temp_feature[action.payload.index][action.payload.floor_index] =
          action.payload.value;
        break;

      case types.ADD_PROJECT_TYPE_FLOOR_FEATURE:
        draft.one.project_property_type[action.payload.index].floor_plan[
          action.payload.floor_index
        ].feature_list = [
          ...draft.one.project_property_type[action.payload.index].floor_plan[
            action.payload.floor_index
          ].feature_list,
          action.payload.value,
        ];
        // draft.temp_feature[action.payload.index][action.payload.floor_index] =
        //   '';
        break;

      case types.CLEAR_PROJECT_TYPE:
        draft.one.project_property_type =
          initialState.one.project_property_type;
        break;

      case types.SET_IS_BACK:
        draft.is_back = action.payload;
        break;

      case types.AUTO_SAVE_REQUEST:
        draft.auto_loading = true;
        break;
      case types.AUTO_SAVE_FAILURE:
        draft.auto_loading = false;
        break;
      case types.AUTO_SAVE_SUCCESS:
        draft.auto_loading = false;
        draft.one = { ...draft.one, _id: action.payload.data._id };
        break;
    }
  });

export default propertyReducer;
