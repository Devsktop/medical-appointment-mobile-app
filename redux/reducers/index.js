import { combineReducers } from "redux";
import user from "./UserReducer";
import utils from "./utilsReducer";

export default combineReducers({ user, utils });
