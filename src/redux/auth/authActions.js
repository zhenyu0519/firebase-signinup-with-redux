import { authActionTypes } from "./authTypes";
import { auth } from "../../firebase/firebaseUtils";

// for both signin and signup
const userSignInUpSuccess = (user) => ({
  type: authActionTypes.USER_SIGN_IN_SUCCESS,
  payload: user,
});

const userSignInUpFailure = (error) => ({
  type: authActionTypes.USER_SIGN_IN_FAILURE,
  payload: error,
});

// user sign in
const userSignInStart = () => ({
  type: authActionTypes.USER_SIGN_IN_START,
});

export const userSignIn = (credential) => (dispatch) => {
  const { email, password } = credential;
  dispatch(userSignInStart());
  auth
    .signInWithEmailAndPassword(email, password)
    .then((signedInUser) => {
      const { displayName, email } = signedInUser.user;
      dispatch(userSignInUpSuccess({ displayName, email }));
    })
    .catch((err) => dispatch(userSignInUpFailure(err)));
};

// user sign up
const userSignUpStart = () => ({
  type: authActionTypes.USER_SIGN_UP_START,
});

export const userSignUp = (credential) => (dispatch) => {
  const { email, password, firstName, lastName } = credential;
  dispatch(userSignUpStart());
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((createdUser) => {
      createdUser.user
        .updateProfile({
          displayName: firstName + " " + lastName,
        })
        .then(() => {
          const { displayName, email } = createdUser.user;
          dispatch(userSignInUpSuccess({ displayName, email }));
        })
        .catch((err) => dispatch(userSignInUpFailure(err)));
    })
    .catch((err) => dispatch(userSignInUpFailure(err)));
};
