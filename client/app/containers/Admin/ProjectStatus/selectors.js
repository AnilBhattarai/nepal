import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the projectStatus state domain
 */

export const selectProjectStatusDomain = state =>
  state.projectStatus || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(
    selectProjectStatusDomain,
    state => state.defaultData,
  );
export const makeSelectAll = () =>
  createSelector(
    selectProjectStatusDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectProjectStatusDomain,
    substate => substate.one,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectProjectStatusDomain,
    substate => substate.query,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectProjectStatusDomain,
    substate => substate.loading,
  );
export const makeSelectErrors = () =>
  createSelector(
    selectProjectStatusDomain,
    state => state.errors,
  );

/**
 * Default selector used by ProjectStatus
 */

const makeSelectProjectStatus = () =>
  createSelector(
    selectProjectStatusDomain,
    substate => substate,
  );

export default makeSelectProjectStatus;
