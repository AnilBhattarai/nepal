import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the currency state domain
 */

export const selectCurrencyDomain = state => state.currency || initialState;

/**
 * Other specific selectors
 */
export const makeSelectAll = () =>
  createSelector(
    selectCurrencyDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectCurrencyDomain,
    substate => substate.one,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectCurrencyDomain,
    substate => substate.query,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectCurrencyDomain,
    substate => substate.loading,
  );
export const makeSelectErrors = () =>
  createSelector(
    selectCurrencyDomain,
    state => state.errors,
  );

/**
 * Default selector used by Currency
 */

const makeSelectCurrency = () =>
  createSelector(
    selectCurrencyDomain,
    substate => substate,
  );

export default makeSelectCurrency;
