import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the area state domain
 */

export const selectDomain = state => state.area || initialState;

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
    substate => substate.errors,
  );

export const makeSelectVdc = () =>
  createSelector(
    selectDomain,
    substate => substate.vdc,
  );

export const makeSelectState = () =>
  createSelector(
    selectDomain,
    substate => substate.state,
  );

export const makeSelectDistrict = () =>
  createSelector(
    selectDomain,
    substate => substate.district,
  );

export const makeSelectActiveStatus = () =>
  createSelector(
    selectDomain,
    substate => substate.active_status,
  );

/**
 * Default selector used by Area
 */

const makeSelectArea = () =>
  createSelector(
    selectDomain,
    substate => substate,
  );

export default makeSelectArea;
