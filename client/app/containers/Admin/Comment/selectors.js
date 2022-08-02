import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the blogCommentManagePage state domain
 */

export const selectDomain = state =>
  state.blogCommentManagePage || initialState;

/**
 * Default selector used by BlogCommentManagePage
 */

export const makeSelectAll = () =>
  createSelector(
    selectDomain,
    substate => substate.all,
  );
export const makeSelectQuery = () =>
  createSelector(
    selectDomain,
    substate => substate.query,
  );
export const makeSelectLoading = () =>
  createSelector(
    selectDomain,
    state => state.loading,
  );

export const makeSelectStatus = () =>
  createSelector(
    selectDomain,
    state => state.status,
  );

export const makeSelectSelected = () =>
  createSelector(
    selectDomain,
    state => state.selected,
  );

export const makeSelectListed = () =>
  createSelector(
    selectDomain,
    state => state.listed_id,
  );

export const makeSelectSelectAll = () =>
  createSelector(
    selectDomain,
    state => state.selectAll,
  );

export const makeSelectOne = () =>
  createSelector(
    selectDomain,
    state => state.one,
  );
export const makeSelectRequesting = () =>
  createSelector(
    selectDomain,
    state => state.requesting,
  );
