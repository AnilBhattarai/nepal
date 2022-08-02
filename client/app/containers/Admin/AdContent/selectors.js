import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adContent state domain
 */

export const selectDomain = state => state.adContent || initialState;

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

export const makeSelectQuery = () =>
  createSelector(
    selectDomain,
    substate => substate.query,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectDomain,
    substate => substate.loading,
  );

export const makeSelectErrors = () =>
  createSelector(
    selectDomain,
    state => state.errors,
  );

export const makeSelectMetaTag = () =>
  createSelector(
    selectDomain,
    state => state.tempMetaTag,
  );

/**
 * Default selector used by AdContent
 */

const makeSelectAdContent = () =>
  createSelector(
    selectDomain,
    substate => substate,
  );

export default makeSelectAdContent;
