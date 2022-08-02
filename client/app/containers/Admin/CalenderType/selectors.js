import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the calenderType state domain
 */

export const selectCalenderTypeDomain = state =>
  state.calenderType || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectCalenderTypeDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectCalenderTypeDomain,
    substate => substate.one,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectCalenderTypeDomain,
    substate => substate.query,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectCalenderTypeDomain,
    substate => substate.loading,
  );

export const makeSelectErrors = () =>
  createSelector(
    selectCalenderTypeDomain,
    state => state.errors,
  );

/**
 * Default selector used by CalenderType
 */

const makeSelectCalenderType = () =>
  createSelector(
    selectCalenderTypeDomain,
    substate => substate,
  );

export default makeSelectCalenderType;
