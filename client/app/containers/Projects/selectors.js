import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the projects state domain
 */

export const selectProjectsDomain = state => state.projects || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(
    selectProjectsDomain,
    state => state.defaultData,
  );
export const makeSelectAll = () =>
  createSelector(
    selectProjectsDomain,
    substate => substate.all,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectProjectsDomain,
    substate => substate.loading,
  );

/**
 * Default selector used by Projects
 */

const makeSelectProjects = () =>
  createSelector(
    selectProjectsDomain,
    substate => substate,
  );

export default makeSelectProjects;
