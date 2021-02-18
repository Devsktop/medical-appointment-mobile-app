/* eslint-disable no-async-promise-executor */
import firestore from "@react-native-firebase/firestore";

export const SPECIALTIES_FILTER = "SPECIALTIES_FILTER";

export const specialtiesFilter = (filter) => ({
  type: SPECIALTIES_FILTER,
  payload: { filter },
});

export const SELECT_SPECIALTY = "SELECT_SPECIALTY";

export const selectSpecialty = (specialty) => ({
  type: SELECT_SPECIALTY,
  payload: { specialty },
});

export const SET_DOCTORS_DATA = "SET_DOCTORS_DATA";

const setDoctorsDataAction = (doctors, specialties) => ({
  type: SET_DOCTORS_DATA,
  payload: { doctors, specialties },
});

export function setDoctorsData() {
  return async (dispatch) => {
    const specialties = await getFirestoreCollection("especialties");
    const doctors = await getFirestoreCollection("doctors");
    const filteredSpecialties = filterSpecialties(doctors, specialties);
    dispatch(setDoctorsDataAction(doctors, filteredSpecialties));
  };
}

const filterSpecialties = (doctors, specialties) => {
  const filteredSpecialties = {};
  Object.keys(doctors).forEach((doctorId) => {
    filteredSpecialties[doctors[doctorId].specialty] = {
      ...specialties[doctors[doctorId].specialty],
    };
  });
  return filteredSpecialties;
};

const getFirestoreCollection = (collectionName) =>
  new Promise(async (resolve) => {
    const collection = await firestore().collection(collectionName).get();
    const object = {};
    if (!collection.empty) {
      collection.forEach((doc) => {
        object[doc.ref.id] = {
          ...doc.data(),
        };
      });
    }
    return resolve(object);
  });
