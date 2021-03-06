import {
  SET_DOCTORS_DATA,
  SPECIALTIES_FILTER,
  SELECT_SPECIALTY,
  DOCTORS_FILTER,
  SELECT_DOCTOR,
  SELECT_CLINIC,
} from "../actions/doctorsActions";

const initialState = {
  specialtiesFilter: "",
  doctorsFilter: "",
  currentSpecialty: "",
  currentDoctor: "",
  currentClinic: "",
  clinics: {},
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_DOCTORS_DATA:
      return {
        ...state,
        doctors: payload.doctors,
        specialties: payload.specialties,
        clinics: payload.clinics,
      };
    case SPECIALTIES_FILTER:
      return {
        ...state,
        specialtiesFilter: payload.filter,
      };
    case DOCTORS_FILTER:
      return {
        ...state,
        doctorsFilter: payload.filter,
      };
    case SELECT_CLINIC:
      return {
        ...state,
        currentClinic: payload.clinic,
      };
    case SELECT_SPECIALTY:
      return {
        ...state,
        currentSpecialty: payload.specialty,
      };
    case SELECT_DOCTOR:
      return {
        ...state,
        currentDoctor: payload.doctor,
      };
    default:
      return state;
  }
}
