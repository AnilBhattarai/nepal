import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the profileProperty state domain
 */

export const selectProfilePropertyDomain = state =>
  state.profileProperty || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(
    selectProfilePropertyDomain,
    state => state.defaultData,
  );

export const makeSelectAll = () =>
  createSelector(
    selectProfilePropertyDomain,
    substate => substate.all,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectProfilePropertyDomain,
    substate => substate.loading,
  );

export const makeSelectLoadingMore = () =>
  createSelector(
    selectProfilePropertyDomain,
    substate => substate.loading_more,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectProfilePropertyDomain,
    substate => substate.query,
  );

export const makeSelectOffer = () =>
  createSelector(
    selectProfilePropertyDomain,
    substate => substate.offers,
  );

export const makeSelectOfferLoading = () =>
  createSelector(
    selectProfilePropertyDomain,
    substate => substate.offer_loading,
  );
export const makeSelectOfferSize = () =>
  createSelector(
    selectProfilePropertyDomain,
    substate => substate.offer_size,
  );

export const makeSelectLocations = () =>
  createSelector(
    selectProfilePropertyDomain,
    substate => substate.locations,
  );

export const makeSelectFilter = () =>
  createSelector(
    selectProfilePropertyDomain,
    substate => substate.filter,
  );

export const makeSelectAgents = () =>
  createSelector(
    selectProfilePropertyDomain,
    substate => substate.agents,
  );

export const makeSelectPropertyCount = () =>
  createSelector(
    selectProfilePropertyDomain,
    substate => substate.property_count,
  );
/**
 * Default selector used by ProfileProperty
 */

const makeSelectProfileProperty = () =>
  createSelector(
    selectProfilePropertyDomain,
    substate => substate,
  );

export default makeSelectProfileProperty;
