import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the recentProperty state domain
 */

export const selectRecentDomain = state => state.recentProperty || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(
    selectRecentDomain,
    state => state.defaultData,
  );

export const makeSelectAll = () =>
  createSelector(
    selectRecentDomain,
    substate => substate.all,
  );
export const makeSelectLoading = () =>
  createSelector(
    selectRecentDomain,
    substate => substate.loading,
  );
/**
 * Default selector used by RecentProperty
 */

const makeSelectRecentProperty = () =>
  createSelector(
    selectRecentDomain,
    substate => substate,
  );

export default makeSelectRecentProperty;
