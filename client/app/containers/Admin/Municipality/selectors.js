import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the municipality state domain
 */

export const selectMunicipalityDomain = state =>
  state.municipality || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectMunicipalityDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectMunicipalityDomain,
    substate => substate.one,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectMunicipalityDomain,
    substate => substate.query,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectMunicipalityDomain,
    substate => substate.loading,
  );

export const makeSelectErrors = () =>
  createSelector(
    selectMunicipalityDomain,
    state => state.errors,
  );

export const makeSelectDistrict = () =>
  createSelector(
    selectMunicipalityDomain,
    substate => substate.district,
  );

/**
 * Default selector used by Municipality
 */

const makeSelectMunicipality = () =>
  createSelector(
    selectMunicipalityDomain,
    substate => substate,
  );

export default makeSelectMunicipality;
