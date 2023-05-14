import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import GeneralReducer from "./GeneralReducer";

export default combineReducers({
  GeneralReducer,
  AuthReducer,
});
