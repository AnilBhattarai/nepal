import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the myRequest state domain
 */

export const selectMyRequestDomain = state => state.myRequest || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectMyRequestDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectMyRequestDomain,
    substate => substate.one,
  );
export const makeSelectPurpose = () =>
  createSelector(
    selectMyRequestDomain,
    substate => substate.purpose,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectMyRequestDomain,
    substate => substate.query,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectMyRequestDomain,
    substate => substate.loading,
  );
export const makeSelectErrors = () =>
  createSelector(
    selectMyRequestDomain,
    state => state.errors,
  );

export const makeSelectCategory = () =>
  createSelector(
    selectMyRequestDomain,
    state => state.category,
  );

/**
 * Default selector used by MyRequest
 */

const makeSelectMyRequest = () =>
  createSelector(
    selectMyRequestDomain,
    substate => substate,
  );

export default makeSelectMyRequest;
