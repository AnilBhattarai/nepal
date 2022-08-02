import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sliderManagePage state domain
 */

export const PopUpSettings = state => state.popUpSettings || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    PopUpSettings,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    PopUpSettings,
    substate => substate.one,
  );

export const makeSelectQuery = () =>
  createSelector(
    PopUpSettings,
    substate => substate.query,
  );

export const makeSelectMedia = () =>
  createSelector(
    PopUpSettings,
    substate => substate.media,
  );

export const makeSelectLoading = () =>
  createSelector(
    PopUpSettings,
    substate => substate.loading,
  );
export const makeSelectErrors = () =>
  createSelector(
    PopUpSettings,
    state => state.errors,
  );

export const makeSelectisAd = () =>
  createSelector(
    PopUpSettings,
    state => state.isAd,
  );

export const makeSelectChosenPopup = () =>
  createSelector(
    PopUpSettings,
    state => state.chosen_popup,
  );
