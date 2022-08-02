import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the states state domain
 */

export const selectStatesDomain = state => state.states || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectStatesDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectStatesDomain,
    substate => substate.one,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectStatesDomain,
    substate => substate.query,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectStatesDomain,
    substate => substate.loading,
  );
export const makeSelectErrors = () =>
  createSelector(
    selectStatesDomain,
    state => state.errors,
  );
/**
 * Default selector used by States
 */

const makeSelectStates = () =>
  createSelector(
    selectStatesDomain,
    substate => substate,
  );

export default makeSelectStates;
