import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the forum state domain
 */

export const selectForumDomain = state => state.forum || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectForumDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectForumDomain,
    substate => substate.one,
  );

export const makeSelectStatus = () =>
  createSelector(
    selectForumDomain,
    substate => substate.status,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectForumDomain,
    substate => substate.query,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectForumDomain,
    substate => substate.loading,
  );
export const makeSelectErrors = () =>
  createSelector(
    selectForumDomain,
    state => state.errors,
  );

/**
 * Default selector used by Forum
 */

const makeSelectForum = () =>
  createSelector(
    selectForumDomain,
    substate => substate,
  );

export default makeSelectForum;
