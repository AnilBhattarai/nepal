import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the project state domain
 */

export const selectDomain = state => state.project || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(
    selectDomain,
    state => state.defaultData,
  );

/**
 * Default selector used by Project
 */

const makeSelectProject = () =>
  createSelector(
    selectDomain,
    substate => substate,
  );

export default makeSelectProject;
