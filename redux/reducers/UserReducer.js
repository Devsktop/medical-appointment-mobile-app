import { SET_USER } from "../actions/UserAction";

const initialState = {};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        ...payload.user,
      };

    default:
      return state;
  }
}
