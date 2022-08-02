import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the usefulCollection state domain
 */

export const selectDomain = state => state.usefulCollection || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectDomain,
    substate => substate.one,
  );
export const makeSelectTempImage = () =>
  createSelector(
    selectDomain,
    substate => substate.tempImage,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectDomain,
    substate => substate.query,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectDomain,
    substate => substate.loading,
  );
export const makeSelectErrors = () =>
  createSelector(
    selectDomain,
    state => state.errors,
  );

/**
 * Default selector used by UsefulCollection
 */

const makeSelectUsefulCollection = () =>
  createSelector(
    selectDomain,
    substate => substate,
  );

export default makeSelectUsefulCollection;