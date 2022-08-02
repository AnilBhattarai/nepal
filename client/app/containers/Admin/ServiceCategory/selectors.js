import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the serviceCategory state domain
 */

export const selectDomain = state => state.serviceCategory || initialState;

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

/**
 * Default selector used by ServiceCategory
 */

const makeSelectServiceCategory = () =>
  createSelector(
    selectDomain,
    substate => substate,
  );

export default makeSelectServiceCategory;
