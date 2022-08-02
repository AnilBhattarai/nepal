import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the developerMessages state domain
 */

export const selectDomain = state => state.developerMessages || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectDomain,
    state => state.all,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectDomain,
    state => state.loading,
  );

/**
 * Default selector used by DeveloperMessages
 */

const makeSelectDeveloperMessages = () =>
  createSelector(
    selectDomain,
    substate => substate,
  );

export default makeSelectDeveloperMessages;
