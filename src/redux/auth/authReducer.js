import { authActionTypes } from "./authTypes";

const INIT_STATE = {
  currentUser: null,
  errorMessage: undefined,
  isLoading: false,
};

const authReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case authActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false,
      };
    case authActionTypes.USER_SIGN_UP_START:
    case authActionTypes.USER_SIGN_IN_START:
    case authActionTypes.USER_SIGN_OUT_START:
      return {
        ...state,
        isLoading: true,
      };
    case authActionTypes.USER_SIGN_IN_UP_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false,
      };
    case authActionTypes.USER_SIGN_IN_UP_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        isLoading: false,
      };
    case authActionTypes.USER_SIGN_OUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case authActionTypes.USER_SIGN_OUT_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
