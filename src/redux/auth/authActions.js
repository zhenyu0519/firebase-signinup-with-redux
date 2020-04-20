import { authActionTypes } from "./authTypes";
import { auth, createUserProfileDocument, googleProvider } from "../../firebase/firebaseUtils";

// set current user for refresh session
export const setCurrentUser = (userInfo) => {
  return {
    type: authActionTypes.SET_CURRENT_USER,
    payload: userInfo,
  };
};
// for both signin and signup
const userSignInUpSuccess = (user) => ({
  type: authActionTypes.USER_SIGN_IN_UP_SUCCESS,
  payload: user,
});

const userSignInUpFailure = (error) => ({
  type: authActionTypes.USER_SIGN_IN_UP_FAILURE,
  payload: error,
});

// user sign in
const userSignInStart = () => ({
  type: authActionTypes.USER_SIGN_IN_START,
});

export const userSignIn = (credential) => async (dispatch) => {
  dispatch(userSignInStart());
  try {
    const { user } = await auth.signInWithEmailAndPassword(
      credential.email,
      credential.password
    );
    const userRef = await createUserProfileDocument(user);
    const snapShot = await userRef.get();
    const { email, displayName } = snapShot.data();
    dispatch(userSignInUpSuccess({ email, displayName }));
  } catch (error) {
    dispatch(userSignInUpFailure(error));
  }
};

// user sign in with google
export const userSignInWithGoogle=()=>async (dispatch)=>{
  dispatch(userSignInStart());
  try {
    const { user } = await auth.signInWithPopup(googleProvider)
    const userRef = await createUserProfileDocument(user);
    const snapShot = await userRef.get();
    const { email, displayName } = snapShot.data();
    dispatch(userSignInUpSuccess({ email, displayName }));
  } catch (error) {
    dispatch(userSignInUpFailure(error));
  }
}

// user sign up
const userSignUpStart = () => ({
  type: authActionTypes.USER_SIGN_UP_START,
});

export const userSignUp = (credential) => async (dispatch) => {
  const { email, password, displayName } = credential;
  dispatch(userSignUpStart());
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    await createUserProfileDocument(user, { displayName });
    dispatch(userSignIn({ email, password }));
    dispatch(userSignInUpSuccess({ displayName, email }));
  } catch (error) {
    dispatch(userSignInUpFailure(error));
  }
};

// user sign out
const userSignOutStart = () => ({
  type: authActionTypes.USER_SIGN_OUT_START,
});

const userSignOutSuccess = () => ({
  type: authActionTypes.USER_SIGN_OUT_SUCCESS,
});

const userSignOutFailure = (err) => ({
  type: authActionTypes.USER_SIGN_OUT_FAILURE,
  payload: err,
});

export const userSignOut = () => (dispatch) => {
  dispatch(userSignOutStart());
  auth
    .signOut()
    .then(dispatch(userSignOutSuccess()))
    .catch((err) => {
      dispatch(userSignOutFailure(err));
    });
};
