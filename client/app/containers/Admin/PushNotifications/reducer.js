/*
 *
 * PushNotifications reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  users: [],
  notification: {
    title: '',
    body: '',
    user_id: 'all',
  },
  loading: false,
  errors: { title: '', body: '' },
};

/* eslint-disable default-case, no-param-reassign */
const pushNotificationsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_USER_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_USER_SUCCESS:
        draft.loading = false;
        draft.users = action.payload.data;
        break;
      case types.LOAD_USER_FAILURE:
        draft.loading = false;
        break;

      case types.SEND_NOTIFICATION_REQUEST:
        draft.loading = true;
        break;
      case types.SEND_NOTIFICATION_SUCCESS:
        draft.loading = false;
        break;
      case types.SEND_NOTIFICATION_FAILURE:
        draft.loading = false;
        draft.errrors = action.payload.errrors;
        break;

      case types.SET_NOTIFICATION_VALUE:
        draft.notification[action.payload.key] = action.payload.value;
        break;
    }
  });

export default pushNotificationsReducer;
