import { authActionTypes } from "./authTypes";

const INIT_STATE = {};

const authReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case authActionTypes.USER_SIGN_UP_START:
      return {
        ...state,
      };
    case authActionTypes.USER_SIGN_UP_SUCCESS:
      return {
        ...state,
      };
    case authActionTypes.USER_SIGN_UP_FAILURE:
      return {
        ...state,
      };
    case authActionTypes.USER_SIGN_IN_START:
      return {
        ...state,
      };
    case authActionTypes.USER_SIGN_IN_SUCCESS:
      return {
        ...state,
      };
    case authActionTypes.USER_SIGN_IN_FAILURE:
      return {
        ...state,
      };
    case authActionTypes.USER_SIGN_OUT_START:
      return {
        ...state,
      };
    case authActionTypes.USER_SIGN_OUT_SUCCESS:
      return {
        ...state,
      };
    case authActionTypes.USER_SIGN_OUT_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default authReducer;
