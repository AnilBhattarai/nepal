import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the propertyFace state domain
 */

export const selectPropertyFaceDomain = state =>
  state.propertyFace || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectPropertyFaceDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectPropertyFaceDomain,
    substate => substate.one,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectPropertyFaceDomain,
    substate => substate.query,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectPropertyFaceDomain,
    substate => substate.loading,
  );

export const makeSelectErrors = () =>
  createSelector(
    selectPropertyFaceDomain,
    state => state.errors,
  );

/**
 * Default selector used by PropertyFace
 */

const makeSelectPropertyFace = () =>
  createSelector(
    selectPropertyFaceDomain,
    substate => substate,
  );

export default makeSelectPropertyFace;
