import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the roadType state domain
 */

export const selectRoadTypeDomain = state => state.roadType || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(
    selectRoadTypeDomain,
    state => state.defaultData,
  );

export const makeSelectAll = () =>
  createSelector(
    selectRoadTypeDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectRoadTypeDomain,
    substate => substate.one,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectRoadTypeDomain,
    substate => substate.query,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectRoadTypeDomain,
    substate => substate.loading,
  );

export const makeSelectErrors = () =>
  createSelector(
    selectRoadTypeDomain,
    state => state.errors,
  );

/**
 * Default selector used by RoadType
 */

const makeSelectRoadType = () =>
  createSelector(
    selectRoadTypeDomain,
    substate => substate,
  );

export default makeSelectRoadType;
