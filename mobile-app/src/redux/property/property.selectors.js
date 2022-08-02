import { createSelector } from 'reselect';

const selectProperty = state => state.property;

export const selectDataLoading = createSelector(
  [selectProperty],
  property => property.loading,
);
export const selectDataLoadMore = createSelector(
  [selectProperty],
  property => property.isLoadMore,
);
export const selectRecentDataLoading = createSelector(
  [selectProperty],
  property => property.recentDataLoading,
);
export const selectWantedDataLoading = createSelector(
  [selectProperty],
  property => property.wantedDataLoading,
);
export const selectHotDataLoading = createSelector(
  [selectProperty],
  property => property.hotDataLoading,
);
export const selectProjectDataLoading = createSelector(
  [selectProperty],
  property => property.projectDataLoading,
);
export const selectTrendingDataLoading = createSelector(
  [selectProperty],
  property => property.trendingDataLoading,
);
export const selectRecentData = createSelector(
  [selectProperty],
  property => property.recentdata,
);
export const selectRecentDataAll = createSelector(
  [selectProperty],
  property => property.recentdataAll,
);
export const selectGetComment = createSelector(
  [selectProperty],
  property => property.commentGet,
);

// export const selectEditCommentTitle = createSelector(
//   [selectEditComment],
//   property => property.comment,
// );
export const selectComment = createSelector(
  [selectProperty],
  property => property.commentPost,
);
export const selectCommentData = createSelector(
  [selectComment],
  property => property.title,
);
export const selectEditComment = createSelector(
  [selectProperty],
  property => property.editCommentPost,
);
export const selectEditCommentData = createSelector(
  [selectComment],
  property => property.title,
);
export const selectOffer = createSelector(
  [selectProperty],
  property => property.offerPost,
);
export const selectOfferData = createSelector(
  [selectOffer],
  property => property.name,
  property => property.email,
  property => property.phone,
  property => property.message,
);
export const selectMyRequest = createSelector(
  [selectProperty],
  property => property.myrequestpost,
);
export const selectMyRequestData = createSelector(
  [selectMyRequest],
  property => property.name,
  property => property.email,
  property => property.message,
  property => property.purpose,
);

export const selectApplyLoan = createSelector(
  [selectProperty],
  property => property.applyLoan,
);
export const selectApplyLoanData = createSelector(
  [selectApplyLoan],
  property => property.full_name,
  property => property.email,
  property => property.mobile,
  property => property.is_identified,
  property => property.type_of_property,
  property => property.looking_for_city,
  property => property.resident_status,
  property => property.employment_type,
  property => property.monthly_income,
  property => property.is_co_borrower,
  property => property.is_active,
);
export const selectHotData = createSelector(
  [selectProperty],
  property => property.hotdata,
);
export const selectHotDataAll = createSelector(
  [selectProperty],
  property => property.hotdataall,
);
export const selectTrendingData = createSelector(
  [selectProperty],
  property => property.trendingdata,
);
export const selectTrendingDataAll = createSelector(
  [selectProperty],
  property => property.trendingdataall,
);
export const selectProjectData = createSelector(
  [selectProperty],
  property => property.projectData,
);
export const selectAgencyData = createSelector(
  [selectProperty],
  property => property.agency,
);
export const selectPropertyByAgency = createSelector(
  [selectProperty],
  property => property.propertyByAgency,
);
export const selectPropertyByAgencyAll = createSelector(
  [selectProperty],
  property => property.propertyByAgencyAll,
);
export const selectProjectDataAll = createSelector(
  [selectProperty],
  property => property.projectDataAll,
);
export const selectFilterData = createSelector(
  [selectProperty],
  property => property.filterdata,
);
export const selectDetailData = createSelector(
  [selectProperty],
  property => property.detailData,
);
export const selectFavouriteData = createSelector(
  [selectProperty],
  property => property.favourite,
);
export const selectWishListData = createSelector(
  [selectProperty],
  property => property.wishlist,
);
export const selectMyPropertyData = createSelector(
  [selectProperty],
  property => property.myproperty,
);
export const selectWantedProperties = createSelector(
  [selectProperty],
  property => property.myrequest,
);
export const selectWantedPropertiesAll = createSelector(
  [selectProperty],
  property => property.myrequestAll,
);
export const selectSlider = createSelector(
  [selectProperty],
  property => property.slider,
);
export const selectBankDetails = createSelector(
  [selectProperty],
  property => property.bankDetails,
);
export const setQueryData = createSelector(
  [selectProperty],
  property => property.query,
);
export const selectUserInfoProperty = createSelector(
  [selectProperty],
  property => property.userInfoProperty,
);
export const selectPostPropertyLoading = createSelector(
  [selectProperty],
  property => property.postLoading,
);
export const selectPostPropertyResponse = createSelector(
  [selectProperty],
  property => property.postPropertyResponse,
);
export const selectPropertyData = createSelector(
  [selectProperty],
  property => property.postProperty,
);
export const selectDataErrors = createSelector(
  [selectProperty],
  property => property.errors,
);

export const selectPropertyMap = createSelector(
  [selectPropertyData],
  property => property.map_src,
);

export const selectPropertyBasic = createSelector(
  [selectPropertyData],
  property => property.basic,
);

export const selectPropertyDataBasic = createSelector(
  [selectPropertyBasic],
  basic => {
    return {
      property_purpose: basic.property_purpose,
      property_category: basic.property_category,
      title: basic.title,
      description: basic.description,
      property_type: basic.property_type,
    };
  },
);

export const selectPropertyPrice = createSelector(
  [selectPropertyData],
  property => property.price,
);
export const selectPropertyDataPrice = createSelector(
  [selectPropertyPrice],
  price => {
    return {
      value: price.value,
      currency: price.currency,
      label: price.label,
    };
  },
);

export const selectPropertyAddress = createSelector(
  [selectPropertyData],
  property => property.address,
);
export const selectPropertyDataAddress = createSelector(
  [selectPropertyAddress],
  address => {
    return {
      state_id: address.state_id, // enum
      district_id: address.district_id, // enum
      city_id: address.city_id, // enum
      area_id: address.area_id, // enum
      house_no: address.house_no,
    };
  },
);
export const selectPropertyBuilding = createSelector(
  [selectPropertyData],
  property => property.building,
);

export const selectPropertyDataBuilding = createSelector(
  [selectPropertyBuilding],
  building => {
    return {
      built_year: building.built_year,
      built_month: building.built_month,
      calender_type: building.calender_type, // AD,BS
      total_floor: building.total_floor,
      furnishing: building.furnishing, // Full,Semi,Un
      kitchen: building.no_of.kitchen,
      dinningroom: building.no_of.dinningroom,
      bedroom: building.no_of.bedroom,
      bathroom: building.no_of.bathroom,
      hall: building.no_of.hall,
      // no_of: {
      //   kitchen: building.no_of.kitchen,
      //   dinningroom: building.no_of.dinningroom,
      //   bedroom: building.,
      //   bathroom: 1,
      //   hall: 1,
      // },
      parking: building.parking,
      amenities: building.amenities, // enum
    };
  },
);
export const selectLocationProperty = createSelector(
  [selectPropertyData],
  property => property.location_property,
);
export const selectLocationPropertyData = createSelector(
  [selectLocationProperty],
  location_property => {
    return {
      total_area_unit: location_property.total_area_unit, // enum
      total_area: location_property.total_area,
      built_area: location_property.built_area,
      built_area_unit: location_property.built_area_unit, // enum
      property_face: location_property.property_face, // enum
      road_access_value: location_property.road_access_value,
      road_access_length_unit: location_property.road_access_length_unit, // enum
      road_access_road_type: location_property.road_access_road_type, // enum
    };
  },
);

export const selectPropertyMedia = createSelector(
  [selectPropertyData],
  property => property.media,
);
export const selectMediaData = createSelector(
  [selectPropertyMedia],
  media => {
    return {
      images: media.images,
      youtube_video_id: media.youtube_video_id,
    };
  },
);
export const selectPropertyTags = createSelector(
  [selectPropertyData],
  property => property.tags,
);
export const selectAgencyId = createSelector(
  [selectPropertyData],
  property => property.agency_id,
);
// export const selectPropertyTagsData = createSelector(
//   [selectPropertyTags],
//   tags => {
//     return {
//       tags,
//     };
//   },
// );