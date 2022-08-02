import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectLoginLogsPageDomain = state =>
  state.loginLogsPage || initialState;

export const makeSelectOne = () =>
  createSelector(
    selectLoginLogsPageDomain,
    substate => substate.one,
  );
export const makeSelectLoading = () =>
  createSelector(
    selectLoginLogsPageDomain,
    substate => substate.loading,
  );

const makeSelectLoginLogsPage = () =>
  createSelector(
    selectLoginLogsPageDomain,
    substate => substate,
  );

export default makeSelectLoginLogsPage;
