import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homeSearch state domain
 */

export const selectHomeSearchDomain = state => state.homeSearch || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(
    selectHomeSearchDomain,
    state => state.defaultData,
  );

export const makeSelectFilter = () =>
  createSelector(
    selectHomeSearchDomain,
    substate => substate.filter,
  );
export const makeSelectEnum = () =>
  createSelector(
    selectHomeSearchDomain,
    substate => substate.enums,
  );

export const makeSelectLocation = () =>
  createSelector(
    selectHomeSearchDomain,
    substate => substate.locations,
  );
export const makeSelectQuery = () =>
  createSelector(
    selectHomeSearchDomain,
    substate => substate.query,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectHomeSearchDomain,
    substate => substate.loading,
  );

/**
 * Default selector used by HomeSearch
 */

const makeSelectHomeSearch = () =>
  createSelector(
    selectHomeSearchDomain,
    substate => substate,
  );

export default makeSelectHomeSearch;
