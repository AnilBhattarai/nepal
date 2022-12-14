import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminUserManagePage state domain
 */

export const selectUserDomain = state =>
  state.adminUserManagePage || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectUserDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectUserDomain,
    substate => substate.one,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectUserDomain,
    state => state.loading,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectUserDomain,
    state => state.query,
  );

export const makeSelectAgentData = () =>
  createSelector(
    selectUserDomain,
    substate => substate.agentData,
  );

export const makeSelectBuilderData = () =>
  createSelector(
    selectUserDomain,
    substate => substate.builderData,
  );

export const makeSelectAuthorData = () =>
  createSelector(
    selectUserDomain,
    substate => substate.authorData,
  );

export const makeSelectRoles = () =>
  createSelector(
    selectUserDomain,
    state => state.roles,
  );

export const makeSelectAgency = () =>
  createSelector(
    selectUserDomain,
    substate => substate.agency,
  );
export const makeSelectErrors = () =>
  createSelector(
    selectUserDomain,
    state => state.errors,
  );

/**
 * Default selector used by User
 */

const makeSelectUser = () =>
  createSelector(
    selectUserDomain,
    substate => substate,
  );

export default makeSelectUser;
