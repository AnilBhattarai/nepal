import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the requestManagement state domain
 */

export const selectRequestDomain = state =>
  state.requestManagement || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(
    selectRequestDomain,
    state => state.defaultData,
  );

export const makeSelectAll = () =>
  createSelector(
    selectRequestDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectRequestDomain,
    substate => substate.one,
  );
export const makeSelectPurpose = () =>
  createSelector(
    selectRequestDomain,
    substate => substate.purpose,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectRequestDomain,
    substate => substate.query,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectRequestDomain,
    substate => substate.loading,
  );
export const makeSelectErrors = () =>
  createSelector(
    selectRequestDomain,
    state => state.errors,
  );

export const makeSelectLocations = () =>
  createSelector(
    selectRequestDomain,
    substate => substate.location,
  );

export const makeSelectPrices = () =>
  createSelector(
    selectRequestDomain,
    substate => substate.prices,
  );

/**
 * Default selector used by RequestManagement
 */

const makeSelectRequestManagement = () =>
  createSelector(
    selectRequestDomain,
    substate => substate,
  );

export default makeSelectRequestManagement;
