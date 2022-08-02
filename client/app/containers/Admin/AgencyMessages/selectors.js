import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the agencyMessages state domain
 */

export const selectDomain = state => state.agencyMessages || initialState;

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
 * Default selector used by AgencyMessages
 */

const makeSelectAgencyMessages = () =>
  createSelector(
    selectDomain,
    substate => substate,
  );

export default makeSelectAgencyMessages;
