import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the projectFeatures state domain
 */

export const selectProjectFeaturesDomain = state =>
  state.projectFeatures || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(
    selectProjectFeaturesDomain,
    state => state.defaultData,
  );

export const makeSelectAll = () =>
  createSelector(
    selectProjectFeaturesDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectProjectFeaturesDomain,
    substate => substate.one,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectProjectFeaturesDomain,
    substate => substate.query,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectProjectFeaturesDomain,
    substate => substate.loading,
  );
export const makeSelectErrors = () =>
  createSelector(
    selectProjectFeaturesDomain,
    state => state.errors,
  );

/**
 * Default selector used by ProjectFeatures
 */

const makeSelectProjectFeatures = () =>
  createSelector(
    selectProjectFeaturesDomain,
    substate => substate,
  );

export default makeSelectProjectFeatures;
