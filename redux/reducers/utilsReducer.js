import { IS_LOADING_PROFILE_PHOTO, SHOW_MENU } from "../actions/utilsActions";

const initialState = {
  isLoadingProfilePhoto: false,
  showMenu: false,
  DoctorAppointmentsListener: null,
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case IS_LOADING_PROFILE_PHOTO:
      return {
        ...state,
        isLoadingProfilePhoto: payload.isLoading,
      };

    case SHOW_MENU:
      return {
        ...state,
        showMenu: payload.show,
      };

    case "FIRABE_DOCTOR_APPOINTMENTS_LISTENER":
      return {
        ...state,
        DoctorAppointmentsListener: payload.unsub,
      };

    default:
      return state;
  }
}
