import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the propertyType state domain
 */

export const selectPropertyTypeDomain = state =>
  state.propertyType || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(
    selectPropertyTypeDomain,
    state => state.defaultData,
  );

export const makeSelectAll = () =>
  createSelector(
    selectPropertyTypeDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectPropertyTypeDomain,
    substate => substate.one,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectPropertyTypeDomain,
    substate => substate.query,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectPropertyTypeDomain,
    substate => substate.loading,
  );
export const makeSelectErrors = () =>
  createSelector(
    selectPropertyTypeDomain,
    state => state.errors,
  );
/**
 * Default selector used by PropertyType
 */

const makeSelectPropertyType = () =>
  createSelector(
    selectPropertyTypeDomain,
    substate => substate,
  );

export default makeSelectPropertyType;
