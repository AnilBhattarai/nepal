/*
 *
 * PushNotifications actions
 *
 */

import * as types from './constants';

export const loadUserRequest = payload => ({
  type: types.LOAD_USER_REQUEST,
  payload,
});
export const loadUserSuccess = payload => ({
  type: types.LOAD_USER_SUCCESS,
  payload,
});
export const loadUserFailure = payload => ({
  type: types.LOAD_USER_FAILURE,
  payload,
});

export const sendNotificationRequest = payload => ({
  type: types.SEND_NOTIFICATION_REQUEST,
  payload,
});
export const sendNotificationSuccess = payload => ({
  type: types.SEND_NOTIFICATION_SUCCESS,
  payload,
});
export const sendNotificationFailure = payload => ({
  type: types.SEND_NOTIFICATION_FAILURE,
  payload,
});

export const setNotificationValue = payload => ({
  type: types.SET_NOTIFICATION_VALUE,
  payload,
});
