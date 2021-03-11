import { combineReducers } from "redux";
import user from "./UserReducer";
import utils from "./utilsReducer";
import doctors from "./doctorsReducer";
import appointments from "./AppointmentsReducer";

const appReducer = combineReducers({ user, utils, doctors, appointments });

export default (state, action) => {
  if (action.type === "USER_LOGOUT") {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }

  return appReducer(state, action);
};
