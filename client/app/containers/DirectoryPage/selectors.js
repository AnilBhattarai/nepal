import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the directoryPage state domain
 */

export const selectDirectoryPageDomain = state =>
  state.directoryPage || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(
    selectDirectoryPageDomain,
    state => state.defaultData,
  );
export const makeSelectAll = () =>
  createSelector(
    selectDirectoryPageDomain,
    substate => substate.all,
  );

export const makeSelectCategories = () =>
  createSelector(
    selectDirectoryPageDomain,
    substate => substate.categories,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectDirectoryPageDomain,
    substate => substate.loading,
  );

/**
 * Default selector used by DirectoryPage
 */

const makeSelectDirectoryPage = () =>
  createSelector(
    selectDirectoryPageDomain,
    substate => substate,
  );

export default makeSelectDirectoryPage;
