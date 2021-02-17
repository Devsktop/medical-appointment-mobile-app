import { combineReducers } from "redux";
import user from "./UserReducer";
import utils from "./utilsReducer";
import doctors from "./doctorsReducer";

export default combineReducers({ user, utils, doctors });
