import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the Agency state domain
 */

export const selectAgencyDomain = state => state.agency || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(
    selectAgencyDomain,
    state => state.defaultData,
  );

export const makeSelectAll = () =>
  createSelector(
    selectAgencyDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectAgencyDomain,
    substate => substate.one,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectAgencyDomain,
    substate => substate.query,
  );
export const makeSelectFilter = () =>
  createSelector(
    selectAgencyDomain,
    substate => substate.filter,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectAgencyDomain,
    substate => substate.loading,
  );
export const makeSelectErrors = () =>
  createSelector(
    selectAgencyDomain,
    state => state.errors,
  );
/**
 * Default selector used by Agency
 */

const makeSelectAgency = () =>
  createSelector(
    selectAgencyDomain,
    substate => substate,
  );

export default makeSelectAgency;
