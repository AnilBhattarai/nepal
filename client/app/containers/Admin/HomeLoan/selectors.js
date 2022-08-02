import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homeLoan state domain
 */

export const selectHomeLoanDomain = state => state.homeLoan || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(
    selectHomeLoanDomain,
    state => state.defaultData,
  );
export const makeSelectAll = () =>
  createSelector(
    selectHomeLoanDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectHomeLoanDomain,
    substate => substate.one,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectHomeLoanDomain,
    substate => substate.query,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectHomeLoanDomain,
    substate => substate.loading,
  );
export const makeSelectErrors = () =>
  createSelector(
    selectHomeLoanDomain,
    substate => substate.errors,
  );

export const makeSelectCity = () =>
  createSelector(
    selectHomeLoanDomain,
    substate => substate.city,
  );

/**
 * Default selector used by HomeLoan
 */

const makeSelectHomeLoan = () =>
  createSelector(
    selectHomeLoanDomain,
    substate => substate,
  );

export default makeSelectHomeLoan;
