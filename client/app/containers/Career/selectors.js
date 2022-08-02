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

export const makeSelectOne = () =>
  createSelector(
    selectCareerDomain,
    substate => substate.one,
  );

export const makeSelectDetail = () =>
  createSelector(
    selectCareerDomain,
    substate => substate.detail,
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

export const makeSelectFileData = () =>
  createSelector(
    selectCareerDomain,
    state => state.file_data,
  );
/**
 * Default selector used by Career
 */

export const makeSelectCareer = () =>
  createSelector(
    selectCareerDomain,
    substate => substate,
  );
