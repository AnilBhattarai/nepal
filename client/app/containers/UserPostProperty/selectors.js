import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userPostProperty state domain
 */

export const selectDomain = state => state.userPostProperty || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(
    selectDomain,
    state => state.defaultData,
  );

/**
 * Default selector used by UserPostProperty
 */

const makeSelectUserPostProperty = () =>
  createSelector(
    selectDomain,
    substate => substate,
  );

export default makeSelectUserPostProperty;
