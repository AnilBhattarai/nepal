import * as types from './auth.types';
import {
  loginPost,
  registerPost,
  forgotPasswordPost,
  changePasswordPost,
  profileGet,
  profilePost,
  uploadPhoto,
  facebookLogin,
  googleLogin,
  logoutGet,
  verifyEmail,
  resendVerifyEmail,
  forgotPasswordChange,
} from '../../api';

import Toast from 'react-native-tiny-toast';
export const setCurrentUser = user => ({
  type: types.SET_CURRENT_USER,
  payload: user,
});

export const loginRequest = payload => async dispatch => {
  dispatch({ type: types.LOGIN_REQUEST, payload });
  try {
    console.log(payload, 'payload');
    const response = await loginPost(payload);
    dispatch({ type: types.LOGIN_SUCCESS, payload: response.data });
    Toast.showSuccess('Logged in Successfully!')
  } catch (err) {
    dispatch({ type: types.LOGIN_FAILURE, payload: err.response.data });
    Toast.show(err.response.data.msg);
    throw err;
  }
};
export const facebook = payload => async dispatch => {
  dispatch({ type: types.FACEBOOK_LOGIN_REQUEST, payload });
  try {
    const response = await facebookLogin(payload.data);
    dispatch({
      type: types.FACEBOOK_LOGIN_SUCCESS,
      payload: response.data,
    });
    Toast.showSuccess('Logged in Successfully!')
  } catch (err) {
    dispatch({
      type: types.FACEBOOK_LOGIN_FAILURE,
      payload: err,
    });
    Toast.show(err.response.data.msg);
    throw err;
  }
};
export const google = payload => async dispatch => {
  dispatch({ type: types.GOOGLE_LOGIN_REQUEST, payload });
  try {
    const response = await googleLogin(payload.data);
    dispatch({ type: types.GOOGLE_LOGIN_SUCCESS, payload: response.data });
    Toast.showSuccess('Logged in Successfully!')
  } catch (err) {
    dispatch({ type: types.GOOGLE_LOGIN_FAILURE, payload: err });
    Toast.show(err.response.data.msg);
    throw err;
  }
};

export const profileInfo = payload => async dispatch => {
  dispatch({ type: types.GET_PROFILE_INFO_REQUEST, payload });
  try {
    const response = await profileGet();
    dispatch({ type: types.GET_PROFILE_INFO_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: types.GET_PROFILE_INFO_FAILURE, payload: err });
    throw err;
  }
};
export const verifyEmailData = payload => async dispatch => {
  dispatch({ type: types.VERIFY_REQUEST, payload });
  try {
    const response = await verifyEmail(payload);
    dispatch({ type: types.VERIFY_SUCCESS, payload: response.data });
    Toast.showSuccess('Email Verified Successfully!')
  } catch (err) {
    dispatch({ type: types.VERIFY_FAILURE, payload: err.response.data });
    Toast.show(err.response.data.msg);
    throw err;
  }
};
export const setVerifyEmailData = payload => dispatch => {
  dispatch({
    type: types.SET_VERIFY_EMAIL_VALUE,
    payload,
  });
};
export const forgotPasswordData = payload => async dispatch => {
  dispatch({ type: types.FORGOT_PASSWORD_REQUEST, payload });
  try {
    const response = await forgotPasswordChange(payload);
    dispatch({ type: types.FORGOT_PASSWORD_SUCCESS, payload: response.data });
    Toast.showSuccess('Password Changed Sucessfully!');
  } catch (err) {
    dispatch({ type: types.FORGOT_PASSWORD_FAILURE, payload: err.response.data });
    Toast.show(err.response.data.msg);
    throw err;
  }
};
export const setforgotPasswordData = payload => dispatch => {
  dispatch({
    type: types.SET_FORGOT_PASSWORD_DATA,
    payload,
  });
};
export const clearforgotPasswordData = payload => dispatch => {
  dispatch({
    type: types.CLEAR_FORGOT_PASSWORD_DATA,
    payload,
  });
};
export const setResendVerifyEmailData = payload => dispatch => {
  dispatch({
    type: types.SET_RESEND_VERIFY_EMAIL_VALUE,
    payload,
  });
};
export const resendVerifyEmailData = payload => async dispatch => {
  dispatch({ type: types.RESEND_VERIFY_REQUEST, payload });
  try {
    const response = await resendVerifyEmail(payload);
    dispatch({ type: types.RESEND_VERIFY_SUCCESS, payload: response.data });
    Toast.showSuccess('Email Verification Code Sent!');
  } catch (err) {
    dispatch({ type: types.RESEND_VERIFY_FAILURE, payload: err.response.data });
    Toast.show(err.response.data.msg);
    throw err;
  }
};
export const profilePhotoUpload = payload => async dispatch => {
  dispatch({ type: types.UPLOAD_PHOTO_REQUEST, payload });
  try {
    const response = await uploadPhoto(payload);
    dispatch({ type: types.UPLOAD_PHOTO_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: types.UPLOAD_PHOTO_FAILURE, payload: err });
    throw err;
  }
};

export const changeprofileInfo = payload => async dispatch => {
  dispatch({ type: types.CHANGE_PROFILE_INFO_REQUEST, payload });
  try {
    const response = await profilePost(payload);
    dispatch({
      type: types.CHANGE_PROFILE_INFO_SUCCESS,
      payload: response.data,
    });
    Toast.showSuccess('Profile Information Updated!');
  } catch (err) {
    dispatch({ type: types.CHANGE_PROFILE_INFO_FAILURE, payload: err });
    Toast.show(err.response.data.msg);
    throw err;
  }
};

export const logout = () => async dispatch => {
  dispatch({ type: types.LOGOUT_REQUEST });
  try {
    const response = await logoutGet();
    dispatch({
      type: types.LOGOUT_SUCCESS,
      payload: response.data,
    });
    Toast.showSuccess('Logged Out Success!');
  } catch (err) {
    dispatch({ type: types.LOGOUT_FAILURE, payload: err.response.data });
    Toast.show('Something went wrong');
    throw err;
  }
};
export const registerRequest = payload => async dispatch => {
  dispatch({ type: types.REGISTER_REQUEST, payload });
  try {
    const response = await registerPost(payload);
    dispatch({ type: types.REGISTER_SUCCESS, payload: response.data });
    Toast.showSuccess('Signed Up Sucessfully!');
  } catch (err) {
    dispatch({ type: types.REGISTER_FAILURE, payload: err.response.data });
    Toast.show(err.response.data.msg);
    throw err;
  }
};

export const forgotPasswordRequest = payload => async dispatch => {
  dispatch({ type: types.FORGOT_PASSWORD_REQUEST, payload });
  try {
    const response = await forgotPasswordPost(payload);
    dispatch({ type: types.FORGOT_PASSWORD_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: types.FORGOT_PASSWORD_FAILURE, payload: err });
    throw err;
  }
};
export const changePasswordRequest = payload => async dispatch => {
  dispatch({ type: types.CHANGE_PASSWORD_REQUEST, payload });
  try {
    const response = await changePasswordPost(payload);
    dispatch({ type: types.CHANGE_PASSWORD_SUCCESS, payload: response.data });
    Toast.showSuccess('Password Changed Sucessfully!')
    return response;
  } catch (err) {
    dispatch({
      type: types.CHANGE_PASSWORD_FAILURE,
      payload: err.response.data,
    });
    Toast.show(err.response.data.msg);
    throw err;
  }
};
export const setProfileData = payload => dispatch => {
  dispatch({
    type: types.SET_PROFILE_VALUE,
    payload,
  });
};
export const clearErrorFiled = payload => dispatch => {
  dispatch({
    type: types.CLEAR_ERROR_FIELD,
    payload,
  });
};
