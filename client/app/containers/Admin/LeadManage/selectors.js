import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the leadManage state domain
 */

export const selectDomain = state => state.leadManage || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectDomain,
    substate => substate.one,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectDomain,
    substate => substate.query,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectDomain,
    substate => substate.loading,
  );
export const makeSelectErrors = () =>
  createSelector(
    selectDomain,
    state => state.errors,
  );

export const makeSelectAgency = () =>
  createSelector(
    selectDomain,
    state => state.agency,
  );

export const makeSelectAgents = () =>
  createSelector(
    selectDomain,
    state => state.agents,
  );

export const makeSelectOpen = () =>
  createSelector(
    selectDomain,
    state => state.open,
  );

export const makeSelectAgentLoading = () =>
  createSelector(
    selectDomain,
    state => state.agent_loading,
  );

/**
 * Default selector used by LeadManage
 */

const makeSelectLeadManage = () =>
  createSelector(
    selectDomain,
    substate => substate,
  );

export default makeSelectLeadManage;
