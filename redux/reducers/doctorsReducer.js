import {
  SET_DOCTORS_DATA,
  SPECIALTIES_FILTER,
} from "../actions/doctorsActions";

const initialState = {
  specialtiesFilter: "",
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_DOCTORS_DATA:
      return {
        ...state,
        doctors: payload.doctors,
        specialties: payload.specialties,
      };
    case SPECIALTIES_FILTER:
      return {
        ...state,
        specialtiesFilter: payload.filter,
      };
    default:
      return state;
  }
}
