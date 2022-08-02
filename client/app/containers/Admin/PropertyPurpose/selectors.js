import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the propertyPurpose state domain
 */

export const selectPropertyPurposeDomain = state =>
  state.propertyPurpose || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(
    selectPropertyPurposeDomain,
    state => state.defaultData,
  );

export const makeSelectAll = () =>
  createSelector(
    selectPropertyPurposeDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectPropertyPurposeDomain,
    substate => substate.one,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectPropertyPurposeDomain,
    substate => substate.query,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectPropertyPurposeDomain,
    substate => substate.loading,
  );

export const makeSelectErrors = () =>
  createSelector(
    selectPropertyPurposeDomain,
    state => state.errors,
  );

export const makeSelectTempImage = () =>
  createSelector(
    selectPropertyPurposeDomain,
    substate => substate.tempImage,
  );

/**
 * Default selector used by PropertyPurpose
 */

const makeSelectPropertyPurpose = () =>
  createSelector(
    selectPropertyPurposeDomain,
    substate => substate,
  );

export default makeSelectPropertyPurpose;
