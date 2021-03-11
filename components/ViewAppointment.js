import React, {useState} from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import IconAnt from "react-native-vector-icons/AntDesign";
import IconMaterial from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import BackButton from "./BackButton";
import firestore from "@react-native-firebase/firestore";
import DoctorIcon from "../assets/doctorProfile.svg";

const dbRef = firestore().collection('appointments');

const getDoctorNames = (doctor) => {
  const firstName = doctor.names.split(" ")[0];
  const lastName = doctor.lastNames.split(" ")[0];
  return `${firstName} ${lastName}`;
};

const doctorSelector = (state) => {
  const { doctors, currentDoctor, specialties } = state.doctors;
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

const appointmentSelector = (state) => {
  const { appointments, currentAppointment } = state.appointments;
  return appointments.find(
    (item) => item.appointmentId === currentAppointment
  );
};

 

  
const ViewAppointment = ({ navigation }) => {
  const appointment = useSelector(appointmentSelector);
  const doctor = useSelector(doctorSelector);

  const passHour = (appointment) ? appointment.startHour : "";
  const passEndHour = (appointment) ? appointment.endHour : "";
  const passText = (appointment) ?  appointment.observations : "";
  const passDate = (appointment) ?  appointment.date.toLocaleDateString("en-GB") : "";
  
  const [appointmentTime, setAppointmentTime] = useState(passHour);
const [appointmentDate, setAppointmentDate] = useState(passDate);
const [appointmentText, setAppointmentText] = useState(passText);
const [appointmentEndTime, setAppointmentEndTime] = useState(passEndHour);
  const handleUpdate = () => {
    navigation.navigate("EditAppointment");
  };
  

  
const deleteAppointment =() =>{
const appointmentD = appointment.appointmentId;
const dbRef = firestore().collection('appointments').doc(appointmentD);
dbRef.delete();
navigation.navigate("Appointments");
    
  }


  const handleDelete = () => {
    Alert.alert(
      "¿Está seguro?",
      "Está a punto de eliminar su consulta agendada. ¿Está seguro?.",
      [
        {
          text: "Aceptar", onPress: ()=> deleteAppointment()
        },{
          text: "Cancelar"
        }
      ],
      { cancelable: false }
    );
  };

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
            Cita Pendiente
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
              <Text style={styles.font}>Hora</Text>
              <Text style={styles.font}>
                {`${appointmentTime} - ${appointmentEndTime}`}
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
              <Text style={styles.font}>{`${doctor.price}$`}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
      <ScrollView style={{ flex: 1, marginTop: 10 }}>
        <View style={styles.body}>
          <View>
            <Text
              style={{
                color: "#408cc2",
                fontSize: 18,
                textTransform: "uppercase",
                margin: 20,
                marginTop: 10,
              }}
            >
              Especializaciones
            </Text>
            <Text style={styles.info}>{doctor.description}</Text>
          </View>
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
            <Text style={styles.info}>{appointmentText}</Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          padding: 20,
          justifyContent: "flex-end",
        }}
      >
        <FontAwesome
          name="pencil-alt"
          size={30}
          color="#3867B4"
          style={{ marginRight: 30 }}
          onPress={handleUpdate}
        />
        <FontAwesome
          name="trash-alt"
          size={30}
          color="#fb6867"
          onPress={handleDelete}
        />
      </View>
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

export default ViewAppointment;
