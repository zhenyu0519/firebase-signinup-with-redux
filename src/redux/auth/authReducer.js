import { authActionTypes } from "./authTypes";

const INIT_STATE = {
  currentUser: null,
};

const authReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case authActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
