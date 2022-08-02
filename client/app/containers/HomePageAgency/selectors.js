import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the HomePageAgency state domain
 */

export const selectHomePageAgencyDomain = state =>
  state.homePageAgency || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(
    selectHomePageAgencyDomain,
    state => state.defaultData,
  );

export const makeSelectAll = () =>
  createSelector(
    selectHomePageAgencyDomain,
    substate => substate.all,
  );

export const makeSelectListing = () =>
  createSelector(
    selectHomePageAgencyDomain,
    substate => substate.listing,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectHomePageAgencyDomain,
    substate => substate.loading,
  );

export const makeSelectLoadingMore = () =>
  createSelector(
    selectHomePageAgencyDomain,
    substate => substate.loading_more,
  );

export const makeSelectTotal = () =>
  createSelector(
    selectHomePageAgencyDomain,
    substate => substate.total,
  );
/**
 * Default selector used by HomePageAgency
 */

const makeSelectHomePageAgency = () =>
  createSelector(
    selectHomePageAgencyDomain,
    substate => substate,
  );

export default makeSelectHomePageAgency;
