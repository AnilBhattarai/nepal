import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the priceLabel state domain
 */

export const selectPriceLabelDomain = state => state.priceLabel || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectPriceLabelDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectPriceLabelDomain,
    substate => substate.one,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectPriceLabelDomain,
    substate => substate.query,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectPriceLabelDomain,
    substate => substate.loading,
  );

export const makeSelectErrors = () =>
  createSelector(
    selectPriceLabelDomain,
    state => state.errors,
  );

/**
 * Default selector used by PriceLabel
 */

const makeSelectPriceLabel = () =>
  createSelector(
    selectPriceLabelDomain,
    substate => substate,
  );

export default makeSelectPriceLabel;
