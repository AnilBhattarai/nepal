import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the agentPage state domain
 */

export const selectAgentDomain = state => state.agentPage || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(
    selectAgentDomain,
    state => state.defaultData,
  );

export const makeSelectAll = () =>
  createSelector(
    selectAgentDomain,
    state => state.all,
  );

export const makeSelectAgent = () =>
  createSelector(
    selectAgentDomain,
    state => state.agent,
  );

export const makeSelectPropertyCount = () =>
  createSelector(
    selectAgentDomain,
    state => state.propertyCount,
  );

export const makeSelectAgents = () =>
  createSelector(
    selectAgentDomain,
    state => state.agents,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectAgentDomain,
    state => state.loading,
  );
export const makeSelectQuery = () =>
  createSelector(
    selectAgentDomain,
    state => state.query,
  );
export const makeSelectEnums = () =>
  createSelector(
    selectAgentDomain,
    state => state.enums,
  );

export const makeSelectHasData = () =>
  createSelector(
    selectAgentDomain,
    state => state.has_data,
  );

export const makeSelectForm = () =>
  createSelector(
    selectAgentDomain,
    state => state.form,
  );

export const makeSelectErrors = () =>
  createSelector(
    selectAgentDomain,
    state => state.errors,
  );

export const makeSelectFormLoading = () =>
  createSelector(
    selectAgentDomain,
    state => state.form_loading,
  );
/**
 * Default selector used by AgentPage
 */

const makeSelectAgentPage = () =>
  createSelector(
    selectAgentDomain,
    substate => substate,
  );

export default makeSelectAgentPage;
