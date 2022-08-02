import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the developers state domain
 */

export const selectDevelopersDomain = state => state.developers || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(
    selectDevelopersDomain,
    state => state.defaultData,
  );

export const makeSelectAll = () =>
  createSelector(
    selectDevelopersDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectDevelopersDomain,
    substate => substate.one,
  );

export const makeSelectTempImage = () =>
  createSelector(
    selectDevelopersDomain,
    substate => substate.tempImage,
  );

export const makeSelectBannerImage = () =>
  createSelector(
    selectDevelopersDomain,
    substate => substate.bannerImage,
  );
export const makeSelectQuery = () =>
  createSelector(
    selectDevelopersDomain,
    substate => substate.query,
  );
export const makeSelectFilter = () =>
  createSelector(
    selectDevelopersDomain,
    substate => substate.filter,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectDevelopersDomain,
    substate => substate.loading,
  );

export const makeSelectErrors = () =>
  createSelector(
    selectDevelopersDomain,
    state => state.errors,
  );

export const makeSelectTempPhone = () =>
  createSelector(
    selectDevelopersDomain,
    state => state.tempPhone,
  );

export const makeSelectTempEmail = () =>
  createSelector(
    selectDevelopersDomain,
    state => state.tempEmail,
  );

/**
 * Default selector used by Developers
 */

const makeSelectDevelopers = () =>
  createSelector(
    selectDevelopersDomain,
    substate => substate,
  );

export default makeSelectDevelopers;
