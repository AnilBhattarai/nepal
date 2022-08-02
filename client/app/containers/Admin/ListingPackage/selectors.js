import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the listingPackage state domain
 */

export const selectDomain = state => state.listingPackage || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(
    selectDomain,
    state => state.defaultData,
  );

export const makeSelectAll = () =>
  createSelector(
    selectDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectDomain,
    substate => substate.one,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectDomain,
    substate => substate.query,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectDomain,
    substate => substate.loading,
  );
export const makeSelectErrors = () =>
  createSelector(
    selectDomain,
    state => state.errors,
  );

/**
 * Default selector used by ListingPackage
 */

const makeSelectListingPackage = () =>
  createSelector(
    selectDomain,
    substate => substate,
  );

export default makeSelectListingPackage;
