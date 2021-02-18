import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import BackButton from "./BackButton";

const DoctorProfile = ({ navigation }) => {
  const [doctor, setDoctor] = useState({
    name: "Alejandro González",
    specialty: "Dermatología",
    experience: "21",
    doctorPicture: require("../assets/doctor.jpg"),
  });
  const [appointment, setAppointment] = useState({
    startTime: "9:00",
    endTime: "9:15",
    price: "400",
    observations: "Picazón intensa y aparición de pigmentos rojos",
    specialization: "Colposcopia, Manejo anticonceptivo, Endometriosis",
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={{ flexDirection: "row" }}>
            <BackButton navigation={navigation} />
            <Text style={{ fontSize: 30, color: "white" }}>  
              Perfil de Médico
            </Text>
          </View>
          <View style={styles.doctorInfo}>
            <Image source={doctor.doctorPicture} style={styles.portrait} />
            <View style={styles.breakLine}>
              <Text style={styles.font}>Dr. {doctor.name} </Text>
              <Text style={styles.font}>{doctor.specialty}</Text>
              <Text style={styles.font}>
                {doctor.experience}+ Años de experiencia{" "}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", backgroundColor: "#408cc2" }}>
            <View style={styles.appointmentInfo}>
              <Icon
                name="time-outline"
                size={60}
                style={{ paddingLeft: 10 }}
                color="black"
              />
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.font}>Horario</Text>
                <Text style={styles.font}>
                  {appointment.startTime}-{appointment.endTime}{" "}
                </Text>
              </View>
            </View>
            <View style={styles.appointmentInfo}>
              <Icon
                name="cash-outline"
                size={60}
                color="black"
                style={{ paddingLeft: 10 }}
              />
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.font}>Precio</Text>
                <Text style={styles.font}>{appointment.price} </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          <Text style={{ color: "#408cc2", fontSize: 28 }}>
            ESPECIALIZACIONES
          </Text>
          <Text style={styles.info}>{appointment.specialization} </Text>
        </View>

        <View style={{ marginTop: 80, marginLeft: "5%" }}>
          <TouchableHighlight style={{ width: "90%", textAlign: "center" }}>
            <Text style={styles.createAppointmentText}> AGENDAR CITA </Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  header: {
    backgroundColor: "#3a6ab1",
  },
  body: {
    padding: 25,
  },

  buttonFont: {
    color: "white",
    fontSize: 25,
    textAlign: "center",
  },

  info: {
    backgroundColor: "#edf0ee",
    fontSize: 25,
  },
  breakLine: {
    flexDirection: "column",
  },
  appointmentInfo: {
    width: "50%",
    borderRightColor: "black",
    borderLeftColor: "black",
    borderTopColor: "#3b65a3",
    borderBottomColor: "#3b65a3",
    borderWidth: 1,
    flexDirection: "row",
  },
  Price: {},
  createAppointmentText: {
    color: "white",
    backgroundColor: "#3a6ab1",
    borderRadius: 5,
    marginLeft: "5%",
    padding: 4,
    textAlign: "center",
    fontSize: 22,
  },
  font: {
    color: "white",
    fontSize: 20,
    paddingLeft: 15,
    paddingTop: 5,

    fontFamily: "helvetic",
  },
  doctorInfo: {
    flexDirection: "row",
  },
  portrait: {
    width: 120,
    height: 120,
    borderRadius: 180,
  },
});

export default DoctorProfile;
