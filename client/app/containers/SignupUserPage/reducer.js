/*
 *
 * SignupUserPage reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  name: '',
  email: '',
  password: '',
  errors: {},
  mobile_no: '',
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const signupUserPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_STORE_VALUE:
        draft[action.payload.key] = action.payload.value;
        break;
      case types.SIGNUP_REQUEST:
        draft.loading = true;
        break;
      case types.SIGNUP_SUCCESS:
        draft.loading = false;
        break;
      case types.SIGNUP_FAILURE:
        draft.loading = false;
        draft.errors = { ...action.payload.errors };
        break;
      case types.CLEAR_STORE:
        draft.email = initialState.email;
        draft.name = initialState.name;
        draft.password = initialState.password;
        draft.errors = initialState.errors;
        draft.mobile_no = initialState.mobile_no;
        break;
    }
  });

export default signupUserPageReducer;
