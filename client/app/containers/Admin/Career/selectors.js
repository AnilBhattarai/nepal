import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the career state domain
 */

export const selectCareerDomain = state => state.career || initialState;

/**
 * Other specific selectors
 */
export const makeSelectAll = () =>
  createSelector(
    selectCareerDomain,
    substate => substate.all,
  );
export const makeSelectAppliedUsers = () =>
  createSelector(
    selectCareerDomain,
    substate => substate.applied_users,
  );

export const makeSelectOne = () =>
  createSelector(
    selectCareerDomain,
    substate => substate.one,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectCareerDomain,
    substate => substate.query,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectCareerDomain,
    substate => substate.loading,
  );
export const makeSelectErrors = () =>
  createSelector(
    selectCareerDomain,
    state => state.errors,
  );
/**
 * Default selector used by Career
 */

const makeSelectCareer = () =>
  createSelector(
    selectCareerDomain,
    substate => substate,
  );

export default makeSelectCareer;
