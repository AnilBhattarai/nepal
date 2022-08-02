import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminAuthorsManagePage state domain
 */

export const selectAuthorsDomain = state =>
  state.adminAuthorsManagePage || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectAuthorsDomain,
    substate => substate.all,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectAuthorsDomain,
    state => state.loading,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectAuthorsDomain,
    state => state.query,
  );

export const makeSelectAuthorData = () =>
  createSelector(
    selectAuthorsDomain,
    substate => substate.authorData,
  );

export const makeSelectErrors = () =>
  createSelector(
    selectAuthorsDomain,
    state => state.errors,
  );

/**
 * Default selector used by Authors
 */

const makeSelectAuthors = () =>
  createSelector(
    selectAuthorsDomain,
    substate => substate,
  );

export default makeSelectAuthors;
