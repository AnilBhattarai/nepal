import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the trendingProperty state domain
 */

export const selectTrendingPropertyDomain = state =>
  state.trendingProperty || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(
    selectTrendingPropertyDomain,
    state => state.defaultData,
  );
export const makeSelectAll = () =>
  createSelector(
    selectTrendingPropertyDomain,
    substate => substate.all,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectTrendingPropertyDomain,
    substate => substate.loading,
  );

/**
 * Default selector used by TrendingProperty
 */

const makeSelectTrendingProperty = () =>
  createSelector(
    selectTrendingPropertyDomain,
    substate => substate,
  );

export default makeSelectTrendingProperty;
