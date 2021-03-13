import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import IconAnt from "react-native-vector-icons/AntDesign";
import IconMaterial from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from "react-native-gesture-handler";
import BackButton from "./BackButton";
import WorkingDays from "./WorkingDays";

import DoctorIcon from "../assets/doctorProfile.svg";

const getDoctorNames = (doctor) => {
  const firstName = doctor.names.split(" ")[0];
  const lastName = doctor.lastNames.split(" ")[0];
  return `${firstName} ${lastName}`;
};

const doctorSelector = (state) => {
  const { doctors, currentDoctor, specialties } = state.doctors;
  if (!doctors) return null;
  const specialtyId = doctors[currentDoctor].specialty;
  const doctor = {
    ...doctors[currentDoctor],
    specialty: {
      id: specialtyId,
      specialty: specialties[specialtyId].specialty,
    },
  };
  return doctor;
};

const DoctorProfile = ({ navigation }) => {
  const doctor = useSelector(doctorSelector);
  if (!doctor) return null;

  return (
    <View style={styles.container}>
      <LinearGradient style={styles.header} colors={["#3867B4", "#0F94B4"]}>
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <BackButton navigation={navigation} />
          <Text
            style={{
              fontSize: 20,
              color: "white",
              marginBottom: 20,
              marginLeft: 10,
            }}
          >
            Perfil de doctor
          </Text>
        </View>
        <View style={styles.doctorInfo}>
          <View style={styles.portrait}>
            <DoctorIcon width={70} height={70} />
          </View>
          <View style={styles.breakLine}>
            <Text style={[styles.font, styles.fontBig]}>
              {getDoctorNames(doctor)}
            </Text>
            <Text style={[styles.font, styles.fontBig]}>
              {doctor.specialty.specialty}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.appointmentInfo}>
            <IconAnt
              name="clockcircle"
              size={30}
              style={{ paddingLeft: 10 }}
              color="#acfac7"
            />
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.font}>Horario</Text>
              <Text style={styles.font}>
                {`${doctor.startHour} - ${doctor.endHour}`}
              </Text>
            </View>
          </View>
          <View style={styles.appointmentInfo}>
            <IconMaterial
              name="attach-money"
              size={30}
              color="#2c99bb"
              style={{
                padding: 1,
                backgroundColor: "#acfac7",
                borderRadius: 100,
              }}
            />
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.font}>Cuota</Text>
              <Text style={styles.font}>{`${doctor.price}/Sesión`}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.body}>
        <View style={{ flex: 1 }}>
          <ScrollView>
            <WorkingDays workingDays={doctor.workingDays} />
            <View>
              <Text
                style={{
                  color: "#408cc2",
                  fontSize: 18,
                  textTransform: "uppercase",
                  margin: 20,
                }}
              >
                Especializaciones
              </Text>
              <Text style={styles.info}>{doctor.description}</Text>
            </View>
          </ScrollView>
        </View>

        <View
          style={{
            width: "100%",
            padding: 20,
            paddingBottom: 0,
          }}
        >
          <TouchableHighlight
            style={{ textAlign: "center" }}
            onPress={() => navigation.navigate("CreateAppointment")}
          >
            <Text style={styles.createAppointmentText}> AGENDAR CITA </Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  header: {
    backgroundColor: "#3a6ab1",
  },
  body: {
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
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
    width: "50%",
    margin: 1,
    flexDirection: "row",
    backgroundColor: "#2c99bb",
    padding: 5,
    justifyContent: "center",
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

export default DoctorProfile;
