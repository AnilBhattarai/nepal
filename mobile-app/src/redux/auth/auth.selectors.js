import { createSelector } from 'reselect';

const selectAuth = state => state.auth;
export const selectLoading = createSelector(
  [selectAuth],
  auth => auth.loading,
);
export const selectAuthErrors = createSelector(
  [selectAuth],
  auth => auth.error,
);
export const selectAuthResponse = createSelector(
  [selectAuth],
  auth => auth.response,
);
export const selectImageLoading = createSelector(
  [selectAuth],
  auth => auth.imageLoading,
);
export const selectCurrentUser = createSelector(
  [selectAuth],
  auth => auth.currentUser,
);
export const selectData = createSelector(
  [selectAuth],
  auth => auth.data,
);
export const selectForgotPassword = createSelector(
  [selectAuth],
  auth => auth.forgotPassword,
);
export const selectForgotPasswordData = createSelector(
  [selectForgotPassword],
  auth => auth.code,
  auth => auth.password,
  auth => auth.confirm_password,
  auth => auth.email,
);
export const selectVerifyEmail = createSelector(
  [selectAuth],
  auth => auth.verifyEmail,
);
export const selectVerifyEmailData = createSelector(
  [selectVerifyEmail],
  auth => auth.code,
  auth => auth.email,
);
export const selectResendVerifyEmail = createSelector(
  [selectAuth],
  auth => auth.verifyEmail,
);
export const selectResendVerifyEmailData = createSelector(
  [selectResendVerifyEmail],
  auth => auth.email,
);
export const selectImage = createSelector(
  [selectAuth],
  auth => auth.images,
);
export const selectProfileInfo = createSelector(
  [selectAuth],
  auth => auth.profileInfo,
);