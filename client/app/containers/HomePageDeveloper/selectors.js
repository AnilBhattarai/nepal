import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the HomePageDeveloper state domain
 */

export const selectHomePageDeveloperDomain = state =>
  state.homePageDeveloper || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(
    selectHomePageDeveloperDomain,
    state => state.defaultData,
  );

export const makeSelectAll = () =>
  createSelector(
    selectHomePageDeveloperDomain,
    substate => substate.all,
  );

export const makeSelectListing = () =>
  createSelector(
    selectHomePageDeveloperDomain,
    substate => substate.listing,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectHomePageDeveloperDomain,
    substate => substate.loading,
  );

export const makeSelectLoadingMore = () =>
  createSelector(
    selectHomePageDeveloperDomain,
    substate => substate.loading_more,
  );
/**
 * Default selector used by HomePageDeveloper
 */

const makeSelectHomePageDeveloper = () =>
  createSelector(
    selectHomePageDeveloperDomain,
    substate => substate,
  );

export default makeSelectHomePageDeveloper;
