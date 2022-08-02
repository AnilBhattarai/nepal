import produce from 'immer';
import * as types from './property.types';

const INITIAL_STATE = {
  loading: false,
  isLoadMore: false,
  recentDataLoading: false,
  wantedDataLoading: false,
  hotDataLoading: false,
  projectDataLoading: false,
  trendingDataLoading: false,
  postLoading: false,
  recentdata: [],
  recentdataAll: { data: [], page: 1, totaldata: 0 },
  hotdata: [],
  hotdataall: { data: [], page: 1, totaldata: 0 },
  trendingdata: {},
  trendingdataall: { data: [], page: 1, totaldata: 0 },
  filterdata: { data: [], page: 1, totaldata: 0 },
  commentGet: {
    comment: [
      {
        _id: '',
        added_at: '',
        added_by: {
          _id: '',
          name: '',
        },
        replies: [],
        status: '',
        title: '',
      },
    ],
    totaldata: 1,
  },
  detailData: {},
  projectData: [],
  projectDataAll: [],
  favourite: {},
  wishlist: [],
  myproperty: [],
  myrequest: {},
  slider: {},
  myrequestAll: {},
  bankDetails: { data: [], page: 1, totaldata: 0 },
  postPropertyResponse: {},
  agency: {},
  propertyByAgency: [],
  propertyByAgencyAll: { data: [], page: 1, totaldata: 0 },
  myrequestpost: {
    name: '',
    email: '',
    message: '',
    purpose: '5d660baf7682d03f547a6c48',
  },
  commentPost: {
    title: '',
  },
  editCommentPost: {
    title: '',
  },
  offerPost: {
    name: '',
    email: '',
    phone: '',
    message: '',
  },
  errors: {},
  postProperty: {
    basic: {
      title: '',
      description: '',
      property_purpose: '', // For Sale, Rent, Lease
      property_type: [], // Residential, Plots, Commercial
      property_category: '', // House, Land, Flat, Apartment, Business, Office Space , Hostel
    },
    map_src: '',
    address: {
      state_id: '', // enum
      district_id: '', // enum
      city_id: '', // enum
      area_id: '', // enum
      house_no: '',
    },
    location_property: {
      total_area_unit: '5d6797781881bf21a423ec30', // enum
      total_area: 0,
      built_area: 0,
      built_area_unit: '5d6797781881bf21a423ec30', // enum
      property_face: '5d675c2ca9c9a02f4c40385c', // enum
      road_access_value: 0,
      road_access_length_unit: '5d6e51d8b943ac1d3c456862', // enum
      road_access_road_type: '5d68ae7d3b84b212d47693e9', // enum
    },
    building: {
      built_year: 0,
      built_month: 1,
      calender_type: '5d6cc52873552113c0396023', // AD,BS
      total_floor: 1,
      furnishing: '5d6e2f142499501fe8fa92fd', // Full,Semi,Un
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
      value: '',
      currency: '5d6e185db75d182a28789cb8', // enum
      label: '', // Per Ana, Per SqFeet
    },
    agency_id: '',
    is_active: false,
    is_featured: false,
    is_premium: false,
    is_negotiable: false,
    is_verified: false,
    tags: [],
  },
  userInfoProperty: {},
  query: {
    find_property_category: '',
    find_property_type: '',
    find_selected_price: '',
    find_property_face: '',
    find_road_access_road_type: '',
    find_is_negotiable: '',
    find_is_premium: '',
    find_is_featured: '',
    find_property_purpose: '',
    sort: 1,
  },
  applyLoan: {
    full_name: '',
    email: '',
    mobile: '',
    is_identified: true,
    type_of_property: '',
    looking_for_city: '',
    resident_status: 'Resident Nepalese',
    employment_type: 'Salaried',
    monthly_income: '',
    is_co_borrower: false,
    is_active: false,
    bank_name: '',
  },
};
const reducer = (state = INITIAL_STATE, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.RECENT_PROPERTY_DATA_REQUEST:
        draft.INITIAL_STATE = INITIAL_STATE.recentdata;
        draft.recentDataLoading = true;
        break;
      case types.RECENT_PROPERTY_DATA_SUCCESS:
        draft.recentdata = action.payload;
        draft.recentDataLoading = false;
        break;
      case types.RECENT_PROPERTY_DATA_FAILURE:
        draft.recentDataLoading = false;
        break;
      case types.RECENT_PROPERTY_DATA_REQUEST_ALL:
        draft.recentDataLoading = true;
        break;
      case types.SET_LOAD_MORE_INDICATOR:
        draft.isLoadMore = action.payload;
        break;
      case types.RECENT_PROPERTY_DATA_SUCCESS_ALL:
        draft.isLoadMore = false;
        draft.recentDataLoading = false;
        const dataID = new Set(state.recentdataAll.data.map(({ _id }) => _id));
        const combined = [
          ...state.recentdataAll.data,
          ...action.payload.data.filter(({ _id }) => !dataID.has(_id)),
        ];
        draft.recentdataAll = {
          ...action.payload,
          data: combined,
        };
        break;
      case types.RECENT_PROPERTY_DATA_FAILURE_ALL:
        draft.recentDataLoading = false;
        break;
      case types.CLEAR_RECENT_DATA_ALL:
        draft.recentdataAll.data = [];
        break;
      case types.HOT_PROPERTY_DATA_REQUEST:
        // draft.INITIAL_STATE = INITIAL_STATE.hotdata;
        draft.hotDataLoading = true;
        break;
      case types.HOT_PROPERTY_DATA_SUCCESS:
        draft.hotdata = Object.keys(action.payload).includes('data')
          ? action.payload.data
          : [];
        draft.hotDataLoading = false;
        break;
      case types.HOT_PROPERTY_DATA_FAILURE:
        draft.hotDataLoading = false;
        break;
      case types.HOT_PROPERTY_DATA_REQUEST_All:
        draft.INITIAL_STATE = INITIAL_STATE.hotdataall;
        draft.hotDataLoading = true;
        break;
      case types.HOT_PROPERTY_DATA_SUCCESS_All:
        draft.isLoadMore = false;
        draft.hotDataLoading = false;
        const hotData = new Set(state.hotdataall.data.map(({ _id }) => _id));
        const combinedData = [
          ...state.hotdataall.data,
          ...action.payload.data.filter(({ _id }) => !hotData.has(_id)),
        ];
        draft.hotdataall = {
          ...action.payload,
          data: combinedData,
        };
        break;
      case types.HOT_PROPERTY_DATA_FAILURE_All:
        draft.hotDataLoading = false;
        break;
      case types.TRENDING_PROPERTY_DATA_REQUEST:
        // draft.INITIAL_STATE = INITIAL_STATE.trendingdata;
        draft.trendingDataLoading = true;
        break;
      case types.TRENDING_PROPERTY_DATA_SUCCESS:
        draft.trendingdata = Object.keys(action.payload).includes('data')
          ? action.payload.data
          : [];
        draft.trendingDataLoading = false;
        break;
      case types.TRENDING_PROPERTY_DATA_FAILURE:
        draft.trendingDataLoading = false;
        break;
      case types.TRENDING_PROPERTY_DATA_REQUEST_ALL:
        // draft.INITIAL_STATE = INITIAL_STATE.trendingdata;
        draft.trendingDataLoading = true;
        break;
      case types.TRENDING_PROPERTY_DATA_SUCCESS_ALL:
        draft.isLoadMore = false;
        draft.trendingDataLoading = false;
        const trendingData = new Set(
          state.trendingdataall.data.map(({ _id }) => _id),
        );
        const combinedTrendingData = [
          ...state.trendingdataall.data,
          ...action.payload.data.filter(({ _id }) => !trendingData.has(_id)),
        ];
        draft.trendingdataall = {
          ...action.payload,
          data: combinedTrendingData,
        };
        break;
      case types.TRENDING_PROPERTY_DATA_FAILURE_ALL:
        draft.trendingDataLoading = false;
        break;
      case types.PROJECT_PROPERTY_DATA_REQUEST:
        draft.INITIAL_STATE = INITIAL_STATE.projectData;
        draft.projectDataLoading = true;
        break;
      case types.PROJECT_PROPERTY_DATA_SUCCESS:
        draft.projectData = action.payload;
        draft.projectDataLoading = false;
        break;
      case types.PROJECT_PROPERTY_DATA_FAILURE:
        draft.projectDataLoading = false;
        break;
      case types.PROJECT_PROPERTY_DATA_REQUEST_ALL:
        draft.projectDataLoading = true;
        break;
      case types.PROJECT_PROPERTY_DATA_SUCCESS_ALL:
        draft.projectDataAll = action.payload;
        draft.projectDataLoading = false;
        break;
      case types.PROJECT_PROPERTY_DATA_FAILURE_ALL:
        draft.projectDataLoading = false;
        break;
      case types.WANTED_PROPERTIES_REQUEST:
        draft.INITIAL_STATE = INITIAL_STATE.myrequest;
        draft.wantedDataLoading = true;
        break;
      case types.WANTED_PROPERTIES_SUCCESS:
        draft.myrequest = action.payload;
        draft.wantedDataLoading = false;
        break;
      case types.WANTED_PROPERTIES_FAILURE:
        draft.wantedDataLoading = false;
        break;
      case types.WANTED_PROPERTIES_REQUEST_ALL:
        draft.wantedDataLoading = true;
        break;
      case types.WANTED_PROPERTIES_SUCCESS_ALL:
        draft.myrequestAll = action.payload;
        draft.wantedDataLoading = false;
        break;
      case types.WANTED_PROPERTIES_FAILURE_ALL:
        draft.wantedDataLoading = false;
        break;
      case types.USER_INFO_PROPERTY_GET_SUCCESS:
        draft.userInfoProperty = action.payload.data;
        break;
      case types.BANK_DETAILS_SUCCESS:
        draft.isLoadMore = false;
        draft.loading = false;
        const bank = new Set(state.bankDetails.data.map(({ _id }) => _id));
        const combinedBankData = [
          ...state.bankDetails.data,
          ...action.payload.data.filter(({ _id }) => !bank.has(_id)),
        ];
        draft.bankDetails = {
          ...action.payload,
          data: combinedBankData,
        };
        break;
      case types.COMMENT_PROPERTIES_SUCCESS:
        draft.commentPost = action.payload;
        break;
      case types.EDIT_COMMENT_PROPERTIES_SUCCESS:
        draft.editCommentPost = action.payload;
        break;
      case types.SET_COMMENT_DATA:
        draft.commentPost.title = action.payload.value;
        break;
      case types.SET_EDIT_COMMENT_DATA:
        draft.commentGet.comment[action.payload.index][action.payload.key] =
          action.payload.value;
        break;
      case types.CLEAR_EDIT_COMMENT_FIELD:
        draft.commentGet = INITIAL_STATE.commentGet;
        break;
      case types.OFFER_PROPERTIES_SUCCESS:
        draft.offerPost = action.payload;
        break;
      case types.OFFER_PROPERTIES_FAILURE:
        draft.errors = action.payload.errors;
        break;
      case types.CLEAR_MAKE_OFFER_FIELD:
        draft.offerPost = INITIAL_STATE.offerPost;
        draft.errors = INITIAL_STATE.errors;
        break;
      case types.CLEAR_COMMENT_FIELD:
        draft.commentPost = INITIAL_STATE.commentPost;
        break;
      case types.SET_OFFER_DATA:
        draft.offerPost[action.payload.key] = action.payload.value;
        break;
      case types.POST_MYREQUEST_SUCCESS:
        draft.myrequestpost = action.payload;
        break;
      case types.POST_MYREQUEST_FAILURE:
        draft.errors = action.payload.errors;
        break;
      case types.CLEAR_MAKE_PROPERTY_REQUEST_FIELD:
        draft.myrequestpost = INITIAL_STATE.myrequestpost;
        draft.errors = INITIAL_STATE.errors;
        break;
      case types.SET_MYREQEST_DATA:
        draft.myrequestpost[action.payload.key] = action.payload.value;
        break;
      case types.POST_APPLY_LOAN_SUCCESS:
        draft.applyLoan = action.payload;
        break;
      case types.POST_APPLY_LOAN_FAILURE:
        draft.errors = action.payload.errors;
        break;
      case types.CLEAR_POST_APPLY_LOAN_DATA:
        draft.errors = INITIAL_STATE.errors;
        break;
      case types.SET_POST_APPLY_LOAN_DATA:
        draft.applyLoan[action.payload.key] = action.payload.value;
        break;
      case types.REQUEST_QUERY_SEARCH_DATA: //get query
        draft.loading = true;
        break;
      case types.SUCCESS_QUERY_SEARCH_DATA: {
        draft.isLoadMore = false;
        draft.loading = false;
        const oldData = new Set(state.filterdata.data.map(({ _id }) => _id));
        const newData = [
          ...state.filterdata.data,
          ...action.payload.data.filter(({ _id }) => !oldData.has(_id)),
        ];
        draft.filterdata = {
          ...action.payload,
          data: newData,
        };
        break;
      }
      case types.LOAD_MORE_SUCCESS:
        {
          draft.isLoadMore = false;
          draft.loading = false;
          const oldData = new Set(state.filterdata.data.map(({ _id }) => _id));
          const newData = [
            ...state.filterdata.data,
            ...action.payload.data.filter(({ _id }) => !oldData.has(_id)),
          ];
          draft.filterdata = {
            ...action.payload,
            data: newData,
          };
        }
        break;
      case types.FAILURE_QUERY_SEARCH_DATA: //get query
        draft.loading = false;
        break;
      case types.CLEAR_FILTER_DATA: //get query
        draft.filterdata = INITIAL_STATE.filterdata;
        break;
      case types.CLEAR_QUERY_DATA: //get query
        draft.query = INITIAL_STATE.query;
        break;
      case types.DETAIL_PROPERTY_SUCCESS: //get query
        draft.detailData = action.payload;
        break;
      case types.SET_FILTER_DATA: //set state of query
        draft.query[action.payload.key] = action.payload.value;
        break;
      case types.CLEAR_POST_PROPERTY_FIELD:
        draft.postProperty = INITIAL_STATE.postProperty;
        break;
      case types.CLEAR_POST_PROPERTY_ERRORS_FIELD:
        draft.errors = INITIAL_STATE.errors;
        break;
      case types.POST_PROPERTY_REQUEST:
        draft.postLoading = true;
        break;
      case types.POST_PROPERTY_SUCCESS:
        draft.postPropertyResponse = action.payload;
        draft.postLoading = false;
        draft.postProperty = INITIAL_STATE.postProperty;
        break;
      case types.POST_PROPERTY_FAILURE:
        draft.errors = action.payload;
        draft.postLoading = false;
        break;
      case types.WISHLIST_PROPERTY_REQUEST:
        draft.INITIAL_STATE = INITIAL_STATE.wishlist;
        draft.loading = true;
        break;
      case types.WISHLIST_PROPERTY_SUCCESS:
        draft.wishlist = action.payload.data;
        draft.loading = false;
        break;
      case types.WISHLIST_PROPERTY_FAILURE:
        draft.loading = false;
        break;
      case types.MY_PROPERTY_REQUEST:
        draft.INITIAL_STATE = INITIAL_STATE.myproperty;
        draft.loading = true;
        break;
      case types.MY_PROPERTY_SUCCESS:
        draft.myproperty = action.payload.data;
        draft.loading = false;
        break;
      case types.MY_PROPERTY_FAILURE:
        draft.loading = false;
        break;
      case types.GET_FAVOURITE_PROPERTY_SUCCESS:
      case types.FAVOURITE_PROPERTY_SUCCESS:
        draft.favourite = action.payload;
        break;
      case types.SET_POST_PROPERTY_VALUE_BASIC:
        draft.postProperty.basic[action.payload.key] = action.payload.value;
        break;
      case types.SET_POST_PROPERTY_VALUE_PRICE:
        draft.postProperty.price[action.payload.key] = action.payload.value;
        break;
      case types.SET_POST_PROPERTY_VALUE_ADDRESS:
        draft.postProperty.address = action.payload.value;
        break;
      case types.SET_POST_PROPERTY_VALUE_BUILDING:
        draft.postProperty.building[action.payload.key] = action.payload.value;
        break;
      case types.SET_POST_PROPERTY_VALUE_NO_OF:
        draft.postProperty.building.no_of[action.payload.key] =
          action.payload.value;
        break;
      case types.SET_POST_PROPERTY_VALUE_LOCATION_PROPERTY:
        draft.postProperty.location_property[action.payload.key] =
          action.payload.value;
        break;
      case types.MULTIPLE_PHOTO_REQUEST:
        draft.loading = true;
        break;
      case types.MULTIPLE_PHOTO_SUCCESS:
        draft.postProperty.media.images = [
          ...state.postProperty.media.images,
          ...action.payload.data.map(function images(each) {
            return {
              id: each,
              caption: '5dc3e8d0e1daf24acd5e810d',
            };
          }),
        ];
        draft.loading = false;
        break;
      case types.MULTIPLE_PHOTO_FAILURE:
        draft.loading = false;
        break;
      case types.SET_POST_PROPERTY_VALUE_MEDIA:
        draft.postProperty.media[action.payload.key] =
          action.payload.key === 'images'
            ? [
              ...state.postProperty.media.images.filter(
                (each) => each.id._id !== action.payload.value,
              ),
            ]
            : action.payload.value;
        break;
      case types.SET_POST_PROPERTY_VALUE_TAGS:
        draft.postProperty.tags = action.payload;
        break;
      case types.SET_POST_PROPERTY_VALUE_AGENCY_ID:
        draft.postProperty.agency_id = action.payload.value;
        break;
      case types.SLIDER_GET_SUCCESS:
        draft.slider = action.payload.data;
        break;
      case types.AGENCY_GET_REQUEST:
        draft.loading = true;
        break;
      case types.AGENCY_GET_SUCCESS:
        draft.loading = false;
        draft.agency = action.payload.data;
        break;
      case types.AGENCY_GET_FAILURE:
        draft.loading = false;
        break;
      case types.CLEAR_AGENCY_DATA:
        draft.agency = INITIAL_STATE.agency;
        break;
      case types.PROPERTY_BY_AGENCY_SUCCESS:
        draft.propertyByAgency = action.payload.data;
        break;
      case types.CLEAR_PROPERTY_BY_AGENCY:
        draft.propertyByAgency = INITIAL_STATE.propertyByAgency;
        break;
      case types.PROPERTY_BY_AGENCY_REQUEST_ALL:
        draft.loading = true;
        break;
      case types.PROPERTY_BY_AGENCY_SUCCESS_ALL:
        {
          draft.isLoadMore = false;
          draft.loading = false;
          const oldData = new Set(
            state.propertyByAgencyAll.data.map(({ _id }) => _id),
          );
          const newData = [
            ...state.propertyByAgencyAll.data,
            ...action.payload.data.filter(({ _id }) => !oldData.has(_id)),
          ];
          draft.propertyByAgencyAll = {
            ...action.payload,
            data: newData,
          };
        }
        break;
      case types.PROPERTY_BY_AGENCY_FAILURE_ALL:
        draft.loading = false;
        break;
      case types.CLEAR_ALL_PROPERTY_BY_AGENCY:
        draft.propertyByAgencyAll = INITIAL_STATE.propertyByAgencyAll;
        break;
      case types.COMMENT_GET_REQUEST:
        draft.loading = true;
        break;
      case types.COMMENT_GET_SUCCESS:
        draft.loading = false;
        draft.commentGet = action.payload.data;
        break;
      case types.COMMENT_GET_FAILURE:
        draft.loading = false;
        break;
      case types.DELETE_SUCCESS:
        draft.loading = false;
        draft.commentGet = action.payload.data;
        break;
    }
  });
export default reducer;
