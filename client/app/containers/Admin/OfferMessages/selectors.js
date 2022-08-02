import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the offerMessages state domain
 */

export const selectDomain = state => state.offerMessages || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectDomain,
    state => state.all,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectDomain,
    state => state.loading,
  );

/**
 * Default selector used by OfferMessages
 */

const makeSelectOfferMessages = () =>
  createSelector(
    selectDomain,
    substate => substate,
  );

export default makeSelectOfferMessages;
