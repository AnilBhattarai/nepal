import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the complainType state domain
 */

export const selectComplainTypeDomain = state =>
  state.complainType || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(
    selectComplainTypeDomain,
    state => state.defaultData,
  );

export const makeSelectAll = () =>
  createSelector(
    selectComplainTypeDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectComplainTypeDomain,
    substate => substate.one,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectComplainTypeDomain,
    substate => substate.query,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectComplainTypeDomain,
    substate => substate.loading,
  );
export const makeSelectErrors = () =>
  createSelector(
    selectComplainTypeDomain,
    state => state.errors,
  );

/**
 * Default selector used by ComplainType
 */

const makeSelectComplainType = () =>
  createSelector(
    selectComplainTypeDomain,
    substate => substate,
  );

export default makeSelectComplainType;
