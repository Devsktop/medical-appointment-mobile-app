import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import IconAnt from "react-native-vector-icons/AntDesign";
// Components
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";

const appointmentSelector = (state) => {
  const { appointments, currentAppointment } = state.appointments;
  return appointments.find((item) => item.id === currentAppointment);
};

const ViewDoctorAppointment = ({ navigation }) => {
  const appointment = useSelector(appointmentSelector);

  return (
    <View style={styles.container}>
      <ProfileHeader buttons={false} navigation={navigation} />
      <View style={{ flexDirection: "row" }}>
        <View style={styles.appointmentInfo}>
          <IconAnt
            name="clockcircle"
            size={30}
            style={{ paddingLeft: 10 }}
            color="#acfac7"
          />
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.font}>Hora</Text>
            <Text style={styles.font}>
              {`${appointment.startHour} - ${appointment.endHour}`}
            </Text>
          </View>
        </View>
      </View>
      <ScrollView style={{ flex: 1, marginTop: 10 }}>
        <View style={styles.body}>
          <View>
            <Text
              style={{
                color: "#408cc2",
                fontSize: 18,
                textTransform: "uppercase",
                margin: 20,
              }}
            >
              Observaciones
            </Text>
            <Text style={styles.info}>{appointment.observations}</Text>
          </View>
          <ProfileBody />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#3a6ab1",
  },
  body: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    paddingBottom: 20,
  },

  buttonFont: {
    color: "white",
    fontSize: 25,
    textAlign: "center",
  },

  info: {
    backgroundColor: "#fafafa",
    fontSize: 17,
    color: "gray",
    padding: 20,
  },
  breakLine: {
    flexDirection: "column",
  },
  appointmentInfo: {
    flex: 1,
    width: "50%",
    flexDirection: "row",
    backgroundColor: "#2c99bb",
    padding: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  Price: {},
  createAppointmentText: {
    color: "white",
    backgroundColor: "#3a6ab1",
    borderRadius: 5,
    padding: 4,
    textAlign: "center",
    fontSize: 20,
  },
  font: {
    color: "white",
    fontSize: 16,
    paddingLeft: 15,

    fontFamily: "helvetic",
  },
  fontBig: {
    fontSize: 20,
  },
  doctorInfo: {
    flexDirection: "row",
    padding: 20,
    paddingTop: 0,
  },
  portrait: {
    padding: 12,
    borderColor: "#fff",
    borderWidth: 4,
    borderStyle: "solid",
    borderRadius: 180,
  },
});

export default ViewDoctorAppointment;
