import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the hotProperty state domain
 */

export const selectHotPropertyDomain = state =>
  state.hotProperty || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(
    selectHotPropertyDomain,
    state => state.defaultData,
  );
export const makeSelectAll = () =>
  createSelector(
    selectHotPropertyDomain,
    substate => substate.all,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectHotPropertyDomain,
    substate => substate.loading,
  );

export const makeSelectListing = () =>
  createSelector(
    selectHotPropertyDomain,
    substate => substate.listing,
  );

/**
 * Default selector used by HotProperty
 */

const makeSelectHotProperty = () =>
  createSelector(
    selectHotPropertyDomain,
    substate => substate,
  );

export default makeSelectHotProperty;
