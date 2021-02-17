import { SET_DOCTORS_DATA } from "../actions/doctorsActions";

const initialState = {};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_DOCTORS_DATA:
      return {
        ...state,
        doctors: payload.doctors,
        specialties: payload.specialties,
      };
    default:
      return state;
  }
}
