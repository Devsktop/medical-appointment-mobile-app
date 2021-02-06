import { SET_USER } from "../actions/UserAction";

const initialState = {
  user: {},
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        user: payload.user,
      };

    default:
      return state;
  }
}
