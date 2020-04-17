import { authActionTypes } from "./authTypes";

export const userSignInStart = (credential) => ({
  type: authActionTypes.USER_SIGN_IN_START,
  payload: credential,
});

export const userSignInSuccess = (user) => ({
  type: authActionTypes.USER_SIGN_IN_SUCCESS,
  payload: user,
});

export const userSignInFailure = (error) => ({
  type: authActionTypes.USER_SIGN_IN_FAILURE,
  payload: error,
});
