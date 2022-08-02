import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the pushNotifications state domain
 */

export const selectDomain = state => state.pushNotifications || initialState;

/**
 * Other specific selectors
 */

export const makeSelectUsers = () =>
  createSelector(
    selectDomain,
    state => state.users,
  );

export const makeSelectNotification = () =>
  createSelector(
    selectDomain,
    state => state.notification,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectDomain,
    state => state.loading,
  );

export const makeSelectErrors = () =>
  createSelector(
    selectDomain,
    state => state.errors,
  );

/**
 * Default selector used by PushNotifications
 */

const makeSelectPushNotifications = () =>
  createSelector(
    selectDomain,
    substate => substate,
  );

export default makeSelectPushNotifications;
