/* eslint-disable no-async-promise-executor */
import firestore from "@react-native-firebase/firestore";
import { getAppointmentAction } from "./appointmentsActions";

export const SPECIALTIES_FILTER = "SPECIALTIES_FILTER";

export const specialtiesFilter = (filter) => ({
  type: SPECIALTIES_FILTER,
  payload: { filter },
});

export const DOCTORS_FILTER = "DOCTORS_FILTER";

export const doctorsFilter = (filter) => ({
  type: DOCTORS_FILTER,
  payload: { filter },
});

export const SELECT_SPECIALTY = "SELECT_SPECIALTY";

export const selectSpecialty = (specialty) => ({
  type: SELECT_SPECIALTY,
  payload: { specialty },
});
export const SELECT_CLINIC = "SELECT_CLINIC";

export const selectClinic = (clinic) => ({
  type: SELECT_CLINIC,
  payload: { clinic },
});

export const SELECT_DOCTOR = "SELECT_DOCTOR";

export const selectDoctor = (doctor) => ({
  type: SELECT_DOCTOR,
  payload: { doctor },
});

export const SET_DOCTORS_DATA = "SET_DOCTORS_DATA";

const setDoctorsDataAction = (doctors, specialties, clinics) => ({
  type: SET_DOCTORS_DATA,
  payload: { doctors, specialties, clinics },
});

export function setDoctorsData() {
  return async (dispatch) => {
    const specialties = await getFirestoreCollection("especialties");
    const doctors = await getFirestoreCollection("doctors");
    const clinics = await getFirestoreCollection("clinics");
    const filteredSpecialties = filterSpecialties(doctors, specialties);
    console.log(filteredSpecialties)
    dispatch(setDoctorsDataAction(doctors, specialties, clinics));
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

const appointmentsQuery = (doctorId) =>
  firestore().collection("appointments").where("doctorId", "==", doctorId);

const getAppointment = (doc, specialties) =>
  new Promise(async (resolve) => {
    const user = await getUserData(doc.data().userId);
    user.userData.bornDate = user.userData.bornDate.toDate();
    resolve({
      ...doc.data(),
      date: doc.data().date.toDate(),
      id: doc.ref.id,
      user,
      specialty: specialties[doc.data().specialtyId].specialty,
    });
  });

const filterPenddingAppointments = (appointments) => [
  ...appointments.filter((appointment) => {
    if (appointment.date.setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0))
      return true;
    if (
      appointment.date.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
    ) {
      if (
        parseInt(appointment.endHour.replace(":", ""), 10) >=
        parseInt(
          `${new Date().getHours()}${addZero(new Date().getMinutes())}`,
          10
        )
      )
        return true;
    }
    return false;
  }),
];

const orderAppointmentsByDate = (appointments) =>
  appointments.sort((a, b) => {
    if (a.date - b.date === 0) {
      return (
        parseInt(a.startHour.replace(":", ""), 10) -
        parseInt(b.startHour.replace(":", ""), 10)
      );
    }
    return a.date - b.date;
  });

const doctorSnapShot = (snapShot, dispatch, specialties) => {
  const appointments = [];
  snapShot.forEach(async (doc) => {
    appointments.push(await getAppointment(doc, specialties));
    // const penddingAppointments = filterPenddingAppointments(appointments);
    dispatch(getAppointmentAction(orderAppointmentsByDate(appointments)));
  });
};

export function getDoctorAppointments(doctorId) {
  return async (dispatch, getState) => {
    const { specialties } = getState().doctors;
    const query = appointmentsQuery(doctorId);
    const unsub = query.onSnapshot((snapShot) =>
      doctorSnapShot(snapShot, dispatch, specialties)
    );
    dispatch({
      type: "FIRABE_DOCTOR_APPOINTMENTS_LISTENER",
      payload: { unsub },
    });
  };
}

const getUserData = (userId) =>
  new Promise(async (resolve) => {
    const user = await firestore().collection("users").doc(userId).get();
    resolve(user.data());
  });

const addZero = (i) => {
  if (i < 10) {
    // eslint-disable-next-line no-param-reassign
    i = `0${i}`;
  }
  return i;
};
