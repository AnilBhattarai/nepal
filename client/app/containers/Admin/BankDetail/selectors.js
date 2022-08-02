import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the bankDetail state domain
 */

export const selectBankDomain = state => state.bankDetail || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(
    selectBankDomain,
    state => state.defaultData,
  );

export const makeSelectAll = () =>
  createSelector(
    selectBankDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectBankDomain,
    substate => substate.one,
  );
export const makeSelectTempImage = () =>
  createSelector(
    selectBankDomain,
    substate => substate.tempImage,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectBankDomain,
    substate => substate.query,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectBankDomain,
    substate => substate.loading,
  );
export const makeSelectErrors = () =>
  createSelector(
    selectBankDomain,
    state => state.errors,
  );

/**
 * Default selector used by BankDetail
 */

const makeSelectBankDetail = () =>
  createSelector(
    selectBankDomain,
    substate => substate,
  );

export default makeSelectBankDetail;
