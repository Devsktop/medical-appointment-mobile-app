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

// Components
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import BackButton from "./BackButton";
import DoctorIcon from "../assets/doctor.svg";
import EmptyAppointments from "./EmptyAppointments"
// AActions
import { selectDoctor } from "../redux/actions/doctorsActions";
import { selectAppointment } from "../redux/actions/appointmentsActions";

const clinicSelector = (state) => {
  const { clinics} = state.doctors;
  return clinics;
}
const Appointment = ({ navigation }) => {
  const appointments = useSelector((state) => state.appointments.appointments);

  return (
    <View style={{flex: 1}}>
      <LinearGradient
        style={styles.headerContainer}
        colors={["#3867B4", "#0F94B4"]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Citas médicas</Text>
        </View>
      </LinearGradient>
      <View style={{flex: 1}}>
      {appointments.length>0 ?  (
        <View
          style={{
            width: "100%",
            flex: 1
          }}
        >
          <FlatList
            data={appointments}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <Banner item={item} index={index} navigation={navigation} />
            )}
          />
        </View>
      ) : <EmptyAppointments/>}
    </View>
    </View>
  );
};

export default Appointment;

const Banner = ({ item, index, navigation }) => {
  const dispatch = useDispatch();
  const clinic = useSelector(clinicSelector);
 console.log(clinic)
  const handleOnpress = () => {
    dispatch(selectAppointment(item.appointmentId));
    dispatch(selectDoctor(item.doctorId));
    navigation.navigate("ViewAppointment");
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
              {`Médico: ${item.doctor}`}
            </Text>
            <Text style={styles.appointmentText}>
              {`Clínica: ${clinic[item.clinic].name }`}
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
});
