import { SET_USER, UPDATE_PROFILEPHOTO_URL } from "../actions/UserAction";

const initialState = {};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        ...payload.user,
      };
    case UPDATE_PROFILEPHOTO_URL:
      return {
        ...state,
        profilePhotoUrl: payload.url,
      };

    default:
      return state;
  }
}
