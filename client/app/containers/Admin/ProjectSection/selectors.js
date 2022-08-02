import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the projectSection state domain
 */

export const selectDomain = state => state.projectSection || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectDomain,
    substate => substate.one,
  );
export const makeSelectProperties = () =>
  createSelector(
    makeSelectOne(),
    substate => substate.properties || [],
  );
export const makeSelectLoading = () =>
  createSelector(
    selectDomain,
    substate => substate.loading,
  );
export const makeSelectProjectLoading = () =>
  createSelector(
    selectDomain,
    substate => substate.projectLoading,
  );
export const makeSelectErrors = () =>
  createSelector(
    selectDomain,
    substate => substate.errors,
  );
export const makeSelectTempProjects = () =>
  createSelector(
    selectDomain,
    substate => substate.tempProjects,
  );

export const makeSelectSearchResult = () =>
  createSelector(
    selectDomain,
    substate => substate.searchResult,
  );

/**
 * Default selector used by ProjectSection
 */

const makeSelectProjectSection = () =>
  createSelector(
    selectDomain,
    substate => substate,
  );

export default makeSelectProjectSection;
