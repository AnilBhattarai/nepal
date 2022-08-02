/*
 *
 * PopUp actions
 *
 */

import * as types from './constants';

export const loadPopUpRequest = payload => ({
  type: types.LOAD_POP_UP_REQUEST,
  payload,
});
export const loadPopUpSuccess = payload => ({
  type: types.LOAD_POP_UP_SUCCESS,
  payload,
});
export const loadPopUpFailure = payload => ({
  type: types.LOAD_POP_UP_FAILURE,
  payload,
});
