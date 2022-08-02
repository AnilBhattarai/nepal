import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the lengthUnit state domain
 */

export const selectLengthUnitDomain = state => state.lengthUnit || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectLengthUnitDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectLengthUnitDomain,
    substate => substate.one,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectLengthUnitDomain,
    substate => substate.query,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectLengthUnitDomain,
    substate => substate.loading,
  );
export const makeSelectErrors = () =>
  createSelector(
    selectLengthUnitDomain,
    state => state.errors,
  );

/**
 * Default selector used by LengthUnit
 */

const makeSelectLengthUnit = () =>
  createSelector(
    selectLengthUnitDomain,
    substate => substate,
  );

export default makeSelectLengthUnit;
