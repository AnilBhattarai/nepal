import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homeComponents state domain
 */

export const selectDomain = state => state.homeComponents || initialState;

/**
 * Other specific selectors
 */

export const makeSelectPropertyCategory = () =>
  createSelector(
    selectDomain,
    state => state.property_category,
  );

export const makeSelectDirectory = () =>
  createSelector(
    selectDomain,
    state => state.directories,
  );

export const makeSelectCollections = () =>
  createSelector(
    selectDomain,
    state => state.collections,
  );

/**
 * Default selector used by HomeComponents
 */

const makeSelectHomeComponents = () =>
  createSelector(
    selectDomain,
    substate => substate,
  );

export default makeSelectHomeComponents;
