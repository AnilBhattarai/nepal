import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the propertyCategory state domain
 */

export const selectPropertyCategoryDomain = state =>
  state.propertyCategory || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectPropertyCategoryDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectPropertyCategoryDomain,
    substate => substate.one,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectPropertyCategoryDomain,
    substate => substate.query,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectPropertyCategoryDomain,
    substate => substate.loading,
  );

export const makeSelectErrors = () =>
  createSelector(
    selectPropertyCategoryDomain,
    state => state.errors,
  );

export const makeSelectTempImage = () =>
  createSelector(
    selectPropertyCategoryDomain,
    substate => substate.tempImage,
  );

/**
 * Default selector used by PropertyCategory
 */

const makeSelectPropertyCategory = () =>
  createSelector(
    selectPropertyCategoryDomain,
    substate => substate,
  );

export default makeSelectPropertyCategory;
