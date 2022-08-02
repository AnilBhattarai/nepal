import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the featuredProjects state domain
 */

export const selectDomain = state => state.featuredProjects || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectDomain,
    state => state.all,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectDomain,
    state => state.loading,
  );

/**
 * Default selector used by FeaturedProjects
 */

const makeSelectFeaturedProjects = () =>
  createSelector(
    selectDomain,
    substate => substate,
  );

export default makeSelectFeaturedProjects;
