import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import auth from "@react-native-firebase/auth";

// Components
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import DoctorIcon from "../assets/doctor.svg";
import EmptyAppointments from "./EmptyAppointments";
import BackButton from './BackButton';

// Actions
import { selectAppointment } from "../redux/actions/appointmentsActions";
import { setUser } from "../redux/actions/UserAction";


const getUserNames = (user) => {
  const firstName = user.names.split(" ")[0];
  const lastName = user.lastNames.split(" ")[0];
  return `${firstName} ${lastName}`;
};

const appointmentsSelector = (state) => {
  const { appointments } = state.appointments;
  const pastAppointments = filterPastAppointments(appointments);
  return orderAppointmentsByDate(pastAppointments);
};

const orderAppointmentsByDate = (appointments) =>
  appointments.sort((a, b) => {
    if (a.date - b.date === 0) {
      return (
        (parseInt(a.startHour.replace(":", ""), 10) -
          parseInt(b.startHour.replace(":", ""), 10)) *
        -1
      );
    }
    if (a.date - b.date < 0) return 1;
    if (a.date - b.date > 0) return -1;
    return 0;
  });

const filterPastAppointments = (appointments) => [
  ...appointments.filter((appointment) => {
    if (appointment.date.setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0))
      return false;
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
        return false;
    }
    return true;
  }),
];

const addZero = (i) => {
  if (i < 10) {
    // eslint-disable-next-line no-param-reassign
    i = `0${i}`;
  }
  return i;
};

const AppointmentHistory = ({ navigation }) => {
  const dispatch = useDispatch();
  const appointments = useSelector(appointmentsSelector);
  const unsub = useSelector((state) => state.utils.DoctorAppointmentsListener);
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        style={styles.headerContainer}
        colors={["#3867B4", "#0F94B4"]}
      >
        <View style={styles.header}>
          <BackButton navigation={navigation} />
          <Text style={styles.title}>Historial de citas médicas</Text>
        </View>
      </LinearGradient>
      <View style={{ flex: 1 }}>
        {appointments.length>0 ? (
          <View
            style={{
              width: "100%",
              flex: 1,
            }}
          >
            <FlatList
              data={appointments}
              falsextractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <Banner item={item} index={index} navigation={navigation} />
              )}
            />
          </View>
        ): <EmptyAppointments/>}
        <TouchableHighlight
          style={[styles.logoutButton, { backgroundColor: "#3b65a3" }]}
          onPress={() => navigation.navigate("DoctorAppointments")}
          underlayColor="#2985b3"
        >
          <Text style={styles.logoutButtonText}>Ver citas pendientes</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.logoutButton}
          onPress={() => {
            unsub();
            dispatch({
              type: "USER_LOGOUT",
            });
            auth().signOut();
          }}
          underlayColor="#bf6b6b"
        >
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default AppointmentHistory;

const Banner = ({ item, index, navigation }) => {
  const dispatch = useDispatch();
  const handleOnpress = () => {
    dispatch(selectAppointment(item.id));
    dispatch(setUser(item.user));
    navigation.navigate("ViewDoctorAppointment");
  };
  return (
    <View
      style={{
        width: "100%",
        height: 130,
        backgroundColor: index % 2 === 0 ? "#b8f3f9" : "#afe3fa",
      }}
    >
      <TouchableWithoutFeedback onPress={handleOnpress}>
        <View style={styles.Appointment}>
          <DoctorIcon width={50} height={50} />
          <View style={{ flex: 1 }}>
            <Text style={styles.appointmentSpecialty}>
              {` ${item.specialty}`}
            </Text>
            <Text style={styles.appointmentText}>
              {` ${item.date.toLocaleDateString("en-GB")} | ${item.startHour} - ${
                item.endHour
              } `}
            </Text>
            <Text style={styles.appointmentText}>
              {`Paciente: ${getUserNames(item.user.userData)}`}
            </Text>
          </View>
          <View style={{}}>
            <TouchableHighlight>
              <Icon
                name="chevron-forward-circle-outline"
                size={30}
                style={{}}
                color="#013e7a"
              />
            </TouchableHighlight>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  Appointment: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
  background: {
    width: "100%",
    height: 130,

    backgroundColor: "#69a2ff",
  },
  appointmentText: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
    color: "#000",
  },
  appointmentSpecialty: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#3d62ad",
    textAlign: "center",
    marginBottom: 3,
    textTransform: "uppercase"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
    marginLeft: 20,
    fontSize: 20,
  },
  headerContainer: {
    padding: 20,
    paddingBottom: 0,
    paddingTop: 40,
  },
  logoutButton: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: "#a63838",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  logoutButtonText: {
    color: "white",
    textTransform: "uppercase",
    fontSize: 11,
    textAlign: "center",
  },
});
