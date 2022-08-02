import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the furnishing state domain
 */

export const selectFurnishingDomain = state => state.furnishing || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectFurnishingDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectFurnishingDomain,
    substate => substate.one,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectFurnishingDomain,
    substate => substate.query,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectFurnishingDomain,
    substate => substate.loading,
  );
export const makeSelectErrors = () =>
  createSelector(
    selectFurnishingDomain,
    state => state.errors,
  );

/**
 * Default selector used by Furnishing
 */

const makeSelectFurnishing = () =>
  createSelector(
    selectFurnishingDomain,
    substate => substate,
  );

export default makeSelectFurnishing;
