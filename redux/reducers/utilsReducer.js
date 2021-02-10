import { IS_LOADING_PROFILE_PHOTO } from "../actions/utilsActions";

const initialState = {
  isLoadingProfilePhoto: false,
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case IS_LOADING_PROFILE_PHOTO:
      return {
        ...state,
        isLoadingProfilePhoto: payload.isLoading,
      };

    default:
      return state;
  }
}
