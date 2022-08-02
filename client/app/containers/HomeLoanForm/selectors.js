import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homeLoanForm state domain
 */

export const selectHomeLoanFormDomain = state =>
  state.homeLoanForm || initialState;

/**
 * Other specific selectors
 */

export const makeSelectOne = () =>
  createSelector(
    selectHomeLoanFormDomain,
    substate => substate.one,
  );
export const makeSelectLoading = () =>
  createSelector(
    selectHomeLoanFormDomain,
    substate => substate.loading,
  );
export const makeSelectErrors = () =>
  createSelector(
    selectHomeLoanFormDomain,
    substate => substate.errors,
  );
export const makeSelectCity = () =>
  createSelector(
    selectHomeLoanFormDomain,
    substate => substate.city,
  );
export const makeSelectBankName = () =>
  createSelector(
    selectHomeLoanFormDomain,
    substate => substate.bankName,
  );

export const makeSelectBanks = () =>
  createSelector(
    selectHomeLoanFormDomain,
    substate => substate.banks,
  );

export const makeSelectLoadingMore = () =>
  createSelector(
    selectHomeLoanFormDomain,
    substate => substate.loading_more,
  );
/**
 * Default selector used by HomeLoanForm
 */

const makeSelectHomeLoanForm = () =>
  createSelector(
    selectHomeLoanFormDomain,
    substate => substate,
  );

export default makeSelectHomeLoanForm;
