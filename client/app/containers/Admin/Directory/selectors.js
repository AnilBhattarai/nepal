import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the directory state domain
 */

export const selectDomain = state => state.directory || initialState;

/**
 * Other specific selectors
 */

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

export const makeSelectTempPhone = () =>
  createSelector(
    selectDomain,
    state => state.tempPhone,
  );

export const makeSelectCategories = () =>
  createSelector(
    selectDomain,
    state => state.category,
  );

/**
 * Default selector used by Directory
 */

const makeSelectDirectory = () =>
  createSelector(
    selectDomain,
    substate => substate,
  );

export default makeSelectDirectory;
