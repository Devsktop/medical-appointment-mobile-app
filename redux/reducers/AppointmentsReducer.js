import {
  GET_APPOINTMENTS,
  SELECT_APPOINTMENT,
} from "../actions/appointmentsActions";

const initialState = {
  appointments: [],
  currentAppointment: "",
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_APPOINTMENTS:
      return {
        ...state,
        appointments: payload.appointments,
      };
    case SELECT_APPOINTMENT:
      return {
        ...state,
        currentAppointment: payload.appointmentId,
      };

    default:
      return state;
  }
}
