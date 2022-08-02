import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the comapny state domain
 */

export const selectComapnyDomain = state => state.comapny || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(
    selectComapnyDomain,
    state => state.defaultData,
  );

export const makeSelectAll = () =>
  createSelector(
    selectComapnyDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectComapnyDomain,
    substate => substate.one,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectComapnyDomain,
    substate => substate.query,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectComapnyDomain,
    substate => substate.loading,
  );

export const makeSelectErrors = () =>
  createSelector(
    selectComapnyDomain,
    state => state.errors,
  );

/**
 * Default selector used by Comapny
 */

const makeSelectComapny = () =>
  createSelector(
    selectComapnyDomain,
    substate => substate,
  );

export default makeSelectComapny;
