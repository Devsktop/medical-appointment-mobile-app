import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const SELECT_APPOINTMENT = "SELECT_APPOINTMENT";

export const selectAppointment = (appointmentId) => ({
  type: SELECT_APPOINTMENT,
  payload: { appointmentId },
});
export const GET_APPOINTMENTS = "GET_APPOINTMENTS";

export const getAppointmentAction = (appointments) => ({
  type: GET_APPOINTMENTS,
  payload: { appointments },
});

export function getAppointment() {
  return async (dispatch, getState) => {
    const { specialties, doctors } = getState().doctors;
    const { currentUser } = auth();

    const query = firestore()
      .collection("appointments")
      .where("userId", "==", currentUser.uid);

    const unsub = query.onSnapshot((snapshot) => {
      console.log("snap");
      const getAppointments = [];

      snapshot.forEach((doc) => {
        const doctorName = getDoctorNames(doctors[doc.data().doctorId]);
        getAppointments.push({
          appointmentId: doc.ref.id,
          ...doc.data(),
          date: doc.data().date.toDate(),
          specialty: specialties[doc.data().specialtyId].specialty,
          doctor: doctorName,
        });
      });
      const penddingAppointments = filterPenddingAppointments(getAppointments);
      const orderAppointment = orderAppointmentsByDate(penddingAppointments);
      dispatch(getAppointmentAction(orderAppointment));
    });

    dispatch({
      type: "FIRABE_DOCTOR_APPOINTMENTS_LISTENER",
      payload: { unsub },
    });
  };
}

const getDoctorNames = (doctor) => {
  const firstName = doctor.names.split(" ")[0];
  const lastName = doctor.lastNames.split(" ")[0];
  return `${firstName} ${lastName}`;
};

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

const addZero = (i) => {
  if (i < 10) {
    // eslint-disable-next-line no-param-reassign
    i = `0${i}`;
  }
  return i;
};
