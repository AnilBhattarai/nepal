import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminBuildersManagePage state domain
 */

export const selectBuildersDomain = state =>
  state.adminBuildersManagePage || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectBuildersDomain,
    substate => substate.all,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectBuildersDomain,
    state => state.loading,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectBuildersDomain,
    state => state.query,
  );

export const makeSelectBuilderData = () =>
  createSelector(
    selectBuildersDomain,
    substate => substate.builderData,
  );

export const makeSelectErrors = () =>
  createSelector(
    selectBuildersDomain,
    state => state.errors,
  );

/**
 * Default selector used by Builders
 */

const makeSelectBuilders = () =>
  createSelector(
    selectBuildersDomain,
    substate => substate,
  );

export default makeSelectBuilders;
