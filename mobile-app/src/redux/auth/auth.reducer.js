/* eslint-disable no-fallthrough */
import produce from 'immer';
import * as types from './auth.types';

const INITIAL_STATE = {
  currentUser: null,
  loading: false,
  imageLoading: false,
  error: {},
  response: {},
  data: {
    name: '',
    email: '',
    roles: [],
    avatar: null,
    date_of_birth: '',
    email_verified: false,
    image: {},
  },
  verifyEmail: {
    code: '',
    email: '',
  },
  resendVerifyEmail: {
    email: '',
  },
  forgotPassword: {
    code: '',
    password: '',
    confirm_password: '',
    email: '',
  },
};

const reducer = (state = INITIAL_STATE, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_LOADING:
        draft.loading = action.payload;
        break;
      case types.LOGIN_REQUEST:
      case types.REGISTER_REQUEST:
        draft.loading = true;
        break;
      case types.LOGIN_SUCCESS:
      case types.FACEBOOK_LOGIN_SUCCESS:
      case types.GOOGLE_LOGIN_SUCCESS:
      case types.REGISTER_SUCCESS:
        draft.loading = false;
        draft.currentUser = action.payload.data;
        break;
      case types.LOGIN_FAILURE:
      case types.REGISTER_FAILURE:
        draft.error = action.payload.data;
        draft.loading = false;
        break;
      case types.SET_CURRENT_USER:
        draft.currentUser = action.payload;
        break;
      case types.LOGOUT_SUCCESS:
        draft.currentUser = INITIAL_STATE.currentUser;
        draft.data = INITIAL_STATE.data;
        break;
      case types.LOGIN_FAILURE:
        draft.error = action.payload;
        break;
      case types.CHANGE_PASSWORD_FAILURE:
        draft.error = action.payload.errors;
        break;
      case types.CLEAR_ERROR_FIELD:
        draft.error = INITIAL_STATE.error;
        break;
      case types.RESET_PASSWORD_REQUEST:
        draft.loading = true;
        break;
      case types.RESET_PASSWORD_SUCCESS:
        draft.loading = false;
        draft.forgotPassword = action.payload.data;
        break;
      case types.RESET_PASSWORD_FAILURE:
        draft.loading = false;
        break;
      case types.SET_FORGOT_PASSWORD_DATA:
        draft.forgotPassword[action.payload.key] = action.payload.value;
        break;
      case types.CLEAR_FORGOT_PASSWORD_DATA:
        draft.forgotPassword = INITIAL_STATE.forgotPassword;
        break;
      case types.LOGIN_FAILURE:
        draft.error = action.payload.data;
        break;
      case types.GET_PROFILE_INFO_SUCCESS:
        draft.data = { ...draft.data, ...action.payload.data };
        break;
      case types.UPLOAD_PHOTO_REQUEST:
        draft.imageLoading = true;
        break;
      case types.UPLOAD_PHOTO_SUCCESS:
        draft.data.image = action.payload.data.image;
        draft.imageLoading = false;
        break;
      case types.UPLOAD_PHOTO_FAILURE:
        draft.imageLoading = false;
        break;
      case types.CHANGE_PROFILE_INFO_REQUEST:
        draft.loading = true;
        break;
      case types.CHANGE_PROFILE_INFO_SUCCESS:
        draft.profileInfo = action.payload.profileInfo;
        draft.loading = false;
        break;
      case types.CHANGE_PROFILE_INFO_FAILURE:
        draft.loading = false;
        break;
      case types.SET_PROFILE_VALUE:
        draft.data[action.payload.key] = action.payload.value;
        break;
      case types.FORGOT_PASSWORD_SUCCESS:
        draft.currentUser = INITIAL_STATE.currentUser;
        break;
      // case types.VERIFY_REQUEST:
      //   draft.loading = false;
      //   break;
      case types.VERIFY_SUCCESS:
        draft.response = action.payload;
        draft.loading = false;
        break;
      // case types.VERIFY_FAILURE:
      //   draft.loading = false;
      //   draft.error = action.payload;
      //   break;
      case types.SET_VERIFY_EMAIL_VALUE:
        draft.verifyEmail[action.payload.key] = action.payload.value;
        break;
      case types.RESEND_VERIFY_SUCCESS:
        draft.resendVerifyEmail = action.payload.data;
        break;
      case types.SET_RESEND_VERIFY_EMAIL_VALUE:
        draft.resendVerifyEmail[action.payload.key] = action.payload.value;
        break;
    }
  });

export default reducer;
