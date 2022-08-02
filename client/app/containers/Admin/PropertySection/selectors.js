import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the propertySection state domain
 */

export const selectPropertySectionDomain = state =>
  state.propertySection || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(
    selectPropertySectionDomain,
    state => state.defaultData,
  );

export const makeSelectAll = () =>
  createSelector(
    selectPropertySectionDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectPropertySectionDomain,
    substate => substate.one,
  );
export const makeSelectProperties = () =>
  createSelector(
    makeSelectOne(),
    substate => substate.properties || [],
  );
export const makeSelectLoading = () =>
  createSelector(
    selectPropertySectionDomain,
    substate => substate.loading,
  );
export const makeSelectPropertyLoading = () =>
  createSelector(
    selectPropertySectionDomain,
    substate => substate.propertyLoading,
  );
export const makeSelectErrors = () =>
  createSelector(
    selectPropertySectionDomain,
    substate => substate.errors,
  );
export const makeSelectTempProperties = () =>
  createSelector(
    selectPropertySectionDomain,
    substate => substate.tempProperties,
  );

export const makeSelectSearchResult = () =>
  createSelector(
    selectPropertySectionDomain,
    substate => substate.searchResult,
  );

/**
 * Default selector used by PropertySection
 */

const makeSelectPropertySection = () =>
  createSelector(
    selectPropertySectionDomain,
    substate => substate,
  );

export default makeSelectPropertySection;
