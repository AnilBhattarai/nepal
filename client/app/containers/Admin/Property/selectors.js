import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the property state domain
 */

export const selectPropertyDomain = state => state.property || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectPropertyDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectPropertyDomain,
    substate => substate.one,
  );

export const makeSelectAutoLoading = () =>
  createSelector(
    selectPropertyDomain,
    substate => substate.auto_loading,
  );

export const makeSelectUserStatus = () =>
  createSelector(
    selectPropertyDomain,
    substate => substate.user_status,
  );

export const makeSelectTempAddress = () =>
  createSelector(
    selectPropertyDomain,
    substate => substate.temp_address,
  );

export const makeSelectBasic = () =>
  createSelector(
    makeSelectOne(),
    substate => substate.basic || {},
  );

export const makeSelectAddress = () =>
  createSelector(
    selectPropertyDomain,
    substate => substate.one.address || {},
  );

export const makeSelectIsProject = () =>
  createSelector(
    makeSelectOne(),
    substate => substate.is_project || false,
  );

export const makeSelectLocation = () =>
  createSelector(
    makeSelectOne(),
    substate => substate.location || {},
  );

export const makeSelectLocationProperty = () =>
  createSelector(
    makeSelectOne(),
    substate => substate.location_property || {},
  );

export const makeSelectBuilding = () =>
  createSelector(
    makeSelectOne(),
    substate => substate.building || {},
  );

export const makeSelectNoOf = () =>
  createSelector(
    makeSelectBuilding(),
    substate => substate.no_of || {},
  );

export const makeSelectLocationType = () =>
  createSelector(
    makeSelectLocation(),
    substate => substate.type || {},
  );

export const makeSelectAmenities = () =>
  createSelector(
    makeSelectBuilding(),
    substate => substate.amenities || [],
  );

export const makeSelectMedia = () =>
  createSelector(
    makeSelectOne(),
    substate => substate.media || {},
  );

export const makeSelectImages = () =>
  createSelector(
    makeSelectMedia(),
    substate => substate.images || [],
  );

export const makeSelectProject = () =>
  createSelector(
    makeSelectOne(),
    substate => substate.project || {},
  );

export const makeSelectFloorPlanImages = () =>
  createSelector(
    makeSelectOne(),
    substate => substate.project_floor_plan || [],
  );
export const makeSelectPaymentPlanImages = () =>
  createSelector(
    makeSelectOne(),
    substate => substate.project_payment_plan || [],
  );
export const makeSelectProjectFeatures = () =>
  createSelector(
    makeSelectOne(),
    substate => substate.project_features || [],
  );
export const makeSelectProjectType = () =>
  createSelector(
    makeSelectOne(),
    substate => substate.project_property_type || [],
  );
export const makeSelectPrice = () =>
  createSelector(
    makeSelectOne(),
    substate => substate.price || {},
  );

export const makeSelectQuery = () =>
  createSelector(
    selectPropertyDomain,
    substate => substate.query,
  );
export const makeSelectFilter = () =>
  createSelector(
    selectPropertyDomain,
    substate => substate.filter,
  );
export const makeSelectTempTag = () =>
  createSelector(
    selectPropertyDomain,
    substate => substate.tempTag,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectPropertyDomain,
    substate => substate.loading,
  );

export const makeSelectMediaLoading = () =>
  createSelector(
    selectPropertyDomain,
    substate => substate.media_loading,
  );

export const makeSelectAddressLoading = () =>
  createSelector(
    selectPropertyDomain,
    substate => substate.address_loading,
  );

export const makeSelectErrors = () =>
  createSelector(
    selectPropertyDomain,
    state => state.errors,
  );
export const makeSelectEnum = () =>
  createSelector(
    selectPropertyDomain,
    substate => substate.enums,
  );
export const makeSelectIsLand = () =>
  createSelector(
    selectPropertyDomain,
    substate => substate.is_land,
  );
export const makeSelectLocations = () =>
  createSelector(
    selectPropertyDomain,
    substate => substate.locations,
  );
export const makeSelectAgents = () =>
  createSelector(
    selectPropertyDomain,
    substate => substate.agents || [],
  );
export const makeSelectDevelopers = () =>
  createSelector(
    selectPropertyDomain,
    substate => substate.developers || [],
  );
export const makeSelectState = () =>
  createSelector(
    selectPropertyDomain,
    substate => substate.state,
  );
export const makeSelectDistrict = () =>
  createSelector(
    selectPropertyDomain,
    substate => substate.district,
  );

export const makeSelectMunicipality = () =>
  createSelector(
    selectPropertyDomain,
    substate => substate.municipality,
  );

export const makeSelectArea = () =>
  createSelector(
    selectPropertyDomain,
    substate => substate.area,
  );

export const makeSelectAgentList = () =>
  createSelector(
    selectPropertyDomain,
    substate => substate.agent_list,
  );

export const makeSelectAgentLoading = () =>
  createSelector(
    selectPropertyDomain,
    substate => substate.agent_loading,
  );

export const makeSelectTempFeature = () =>
  createSelector(
    selectPropertyDomain,
    substate => substate.temp_feature,
  );

export const makeSelectIsBack = () =>
  createSelector(
    selectPropertyDomain,
    substate => substate.is_back,
  );

export const makeSelectLoadAll = () =>
  createSelector(
    selectPropertyDomain,
    substate => substate.loading_all,
  );
/**
 * Default selector used by Property
 */

const makeSelectProperty = () =>
  createSelector(
    selectPropertyDomain,
    substate => substate,
  );

export default makeSelectProperty;
