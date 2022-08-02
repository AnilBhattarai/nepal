import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminDashboard state domain
 */

export const selectDashboardDomain = state =>
  state.adminDashboard || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Dashboard
 */

export const makeSelectErrors = () =>
  createSelector(
    selectDashboardDomain,
    state => state.errors,
  );
export const makeSelectUsers = () =>
  createSelector(
    selectDashboardDomain,
    state => state.users,
  );
export const makeSelectInfo = () =>
  createSelector(
    selectDashboardDomain,
    state => state.info,
  );

export const makeSelectBlog = () =>
  createSelector(
    selectDashboardDomain,
    state => state.blog,
  );

export const makeSelectTotalProperties = () =>
  createSelector(
    selectDashboardDomain,
    state => state.total_properties,
  );

export const makeSelectMonthProperties = () =>
  createSelector(
    selectDashboardDomain,
    state => state.month_properties,
  );

export const makeSelectCategoryProperties = () =>
  createSelector(
    selectDashboardDomain,
    state => state.category_properties,
  );

export const makeSelectPostsByAuthors = () =>
  createSelector(
    selectDashboardDomain,
    state => state.posts_by_authors,
  );

export const makeSelectUserCount = () =>
  createSelector(
    selectDashboardDomain,
    state => state.user_count,
  );

export const makeSelectTopAgent = () =>
  createSelector(
    selectDashboardDomain,
    state => state.top_agent,
  );

export const makeSelectTopAreas = () =>
  createSelector(
    selectDashboardDomain,
    state => state.top_areas,
  );

export const makeSelectActiveSold = () =>
  createSelector(
    selectDashboardDomain,
    state => state.sold_count,
  );

export const makeSelectPropertiesByPrice = () =>
  createSelector(
    selectDashboardDomain,
    state => state.properties_by_price,
  );

export const makeSelectPending = () =>
  createSelector(
    selectDashboardDomain,
    state => state.pending,
  );

export const makeSelectLoaders = () =>
  createSelector(
    selectDashboardDomain,
    state => state.loaders,
  );
