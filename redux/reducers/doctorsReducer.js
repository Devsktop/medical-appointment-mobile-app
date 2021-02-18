import {
  SET_DOCTORS_DATA,
  SPECIALTIES_FILTER,
  SELECT_SPECIALTY,
} from "../actions/doctorsActions";

const initialState = {
  specialtiesFilter: "",
  currentSpecialty: "",
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
    case SELECT_SPECIALTY:
      return {
        ...state,
        currentSpecialty: payload.specialty,
      };
    default:
      return state;
  }
}
