import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the amenities state domain
 */

export const selectAmenitiesDomain = state => state.amenities || initialState;

/**
 * Other specific selectors
 */
export const makeSelectAll = () =>
  createSelector(
    selectAmenitiesDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectAmenitiesDomain,
    substate => substate.one,
  );
export const makeSelectTempImage = () =>
  createSelector(
    selectAmenitiesDomain,
    substate => substate.tempImage,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectAmenitiesDomain,
    substate => substate.query,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectAmenitiesDomain,
    substate => substate.loading,
  );
export const makeSelectErrors = () =>
  createSelector(
    selectAmenitiesDomain,
    state => state.errors,
  );
/**
 * Default selector used by Amenities
 */

const makeSelectAmenities = () =>
  createSelector(
    selectAmenitiesDomain,
    substate => substate,
  );

export default makeSelectAmenities;
