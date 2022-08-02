import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the favoriteProperties state domain
 */

export const selectFavoritesDomain = state =>
  state.favoriteProperties || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(
    selectFavoritesDomain,
    state => state.defaultData,
  );

export const makeSelectAll = () =>
  createSelector(
    selectFavoritesDomain,
    substate => substate.all,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectFavoritesDomain,
    substate => substate.loading,
  );

export const makeSelectLoadingMore = () =>
  createSelector(
    selectFavoritesDomain,
    substate => substate.loading_more,
  );

/**
 * Default selector used by FavoriteProperties
 */

const makeSelectFavoriteProperties = () =>
  createSelector(
    selectFavoritesDomain,
    substate => substate,
  );

export default makeSelectFavoriteProperties;
