import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminAgentsManagePage state domain
 */

export const selectAgentsDomain = state =>
  state.adminAgentsManagePage || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectAgentsDomain,
    substate => substate.all,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectAgentsDomain,
    state => state.loading,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectAgentsDomain,
    state => state.query,
  );

export const makeSelectAgentData = () =>
  createSelector(
    selectAgentsDomain,
    substate => substate.agentData,
  );

export const makeSelectAgency = () =>
  createSelector(
    selectAgentsDomain,
    substate => substate.agency,
  );
export const makeSelectErrors = () =>
  createSelector(
    selectAgentsDomain,
    state => state.errors,
  );

/**
 * Default selector used by Agents
 */

const makeSelectAgents = () =>
  createSelector(
    selectAgentsDomain,
    substate => substate,
  );

export default makeSelectAgents;
