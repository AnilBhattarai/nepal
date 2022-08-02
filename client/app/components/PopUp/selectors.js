import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the popUp state domain
 */

export const selectDomain = state => state.popUp || initialState;

/**
 * Other specific selectors
 */

export const makeSelectOne = () =>
  createSelector(
    selectDomain,
    substate => substate.one,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectDomain,
    substate => substate.loading,
  );

export const makeSelectDefaultData = () =>
  createSelector(
    selectDomain,
    state => state.defaultData,
  );

/**
 * Default selector used by PopUp
 */

const makeSelectPopUp = () =>
  createSelector(
    selectDomain,
    substate => substate,
  );

export default makeSelectPopUp;
