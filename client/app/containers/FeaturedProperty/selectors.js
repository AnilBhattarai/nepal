import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the featuredProperty state domain
 */

export const selectFeaturedPropertyDomain = state =>
  state.featuredProperty || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(
    selectFeaturedPropertyDomain,
    state => state.defaultData,
  );

export const makeSelectAll = () =>
  createSelector(
    selectFeaturedPropertyDomain,
    substate => substate.all,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectFeaturedPropertyDomain,
    substate => substate.loading,
  );

/**
 * Default selector used by FeaturedProperty
 */

const makeSelectFeaturedProperty = () =>
  createSelector(
    selectFeaturedPropertyDomain,
    substate => substate,
  );

export default makeSelectFeaturedProperty;
