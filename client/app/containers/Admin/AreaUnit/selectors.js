import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the areaUnit state domain
 */

export const selectAreaUnitDomain = state => state.areaUnit || initialState;

export const makeSelectAll = () =>
  createSelector(
    selectAreaUnitDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectAreaUnitDomain,
    substate => substate.one,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectAreaUnitDomain,
    substate => substate.query,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectAreaUnitDomain,
    substate => substate.loading,
  );

export const makeSelectErrors = () =>
  createSelector(
    selectAreaUnitDomain,
    state => state.errors,
  );

/**
 * Other specific selectors
 */

/**
 * Default selector used by AreaUnit
 */

const makeSelectAreaUnit = () =>
  createSelector(
    selectAreaUnitDomain,
    substate => substate,
  );

export default makeSelectAreaUnit;
