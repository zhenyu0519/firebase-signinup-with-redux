import { combineReducers } from "redux";
// auth reducer
import authReducer from "./auth/authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
