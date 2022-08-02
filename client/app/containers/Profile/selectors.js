import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectUserPersonalInformationPageDomain = state =>
  state.userPersonalInformationPage || initialState;

export const makeSelectOne = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.one,
  );

export const makeSelectOpenAgencyForm = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.openAgencyForm,
  );

export const makeSelectErrors = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.errors,
  );

export const makeSelectSaved = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.saved,
  );

export const makeSelectAgencyErrors = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.agencyErrors,
  );

export const makeSelectNewAgency = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.newAgency,
  );

export const makeSelectNewDeveloper = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.newDeveloper,
  );

export const makeSelectAgentData = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.agentData,
  );

export const makeSelectDashboardInfo = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.dashboardInfo,
  );

export const makeSelectBuilderData = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.builderData,
  );

export const makeSelectAuthorData = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.authorData,
  );
export const makeSelectAgency = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.agency,
  );

export const makeSelectLead = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.lead,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.query,
  );

export const makeSelectDevelopers = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.developers,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.loading,
  );
export const makeSelectCode = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.verification_code,
  );

export const makeSelectToken = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.token,
  );

export const makeSelectOfferMsg = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.offer_messages,
  );

export const makeSelectOfferLoading = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.offer_loading,
  );

export const makeSelectNewOfferLoading = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.new_offer_loading,
  );

export const makeSelectMessage = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.message,
  );

export const makeSelectCategoryReport = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.category_report,
  );

export const makeSelectLocationReport = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.location_report,
  );

export const makeSelectAgentReport = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.agent_report,
  );

export const makeSelectLoaders = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.loaders,
  );

export const makeSelectOpen = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.open,
  );

export const makeSelectStatusLoading = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.status_loading,
  );

export const makeSelectLeadOne = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.lead_one,
  );

const makeSelectUserPersonalInformationPage = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate,
  );

export default makeSelectUserPersonalInformationPage;
