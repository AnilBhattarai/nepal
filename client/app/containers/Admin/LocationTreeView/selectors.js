import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the locationTreeView state domain
 */

export const selectDomain = state => state.locationTreeView || initialState;

/**
 * Other specific selectors
 */

export const makeSelectLocation = () =>
  createSelector(
    selectDomain,
    state => state.location,
  );

/**
 * Default selector used by LocationTreeView
 */

const makeSelectLocationTreeView = () =>
  createSelector(
    selectDomain,
    substate => substate,
  );

export default makeSelectLocationTreeView;
