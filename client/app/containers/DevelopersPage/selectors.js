import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the developersPage state domain
 */

export const selectDevelopersDomain = state =>
  state.developersPage || initialState;

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

export const makeSelectLoading = () =>
  createSelector(
    selectDevelopersDomain,
    substate => substate.loading,
  );

export const makeSelectDeveloper = () =>
  createSelector(
    selectDevelopersDomain,
    substate => substate.developer,
  );

export const makeSelectBuilders = () =>
  createSelector(
    selectDevelopersDomain,
    substate => substate.builders,
  );

export const makeSelectForm = () =>
  createSelector(
    selectDevelopersDomain,
    substate => substate.form,
  );

export const makeSelectErrors = () =>
  createSelector(
    selectDevelopersDomain,
    substate => substate.errors,
  );

export const makeSelectFormLoading = () =>
  createSelector(
    selectDevelopersDomain,
    substate => substate.form_loading,
  );

/**
 * Default selector used by DevelopersPage
 */

const makeSelectDevelopersPage = () =>
  createSelector(
    selectDevelopersDomain,
    substate => substate,
  );

export default makeSelectDevelopersPage;
