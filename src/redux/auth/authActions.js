import { authActionTypes } from "./authTypes";

export const setCurrentUser = (user) => ({
  type: authActionTypes.SET_CURRENT_USER,
  payload: user,
});
