import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";

import IconAnt from "react-native-vector-icons/AntDesign";
import IconMaterial from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import LinearGradient from "react-native-linear-gradient";
import { useSelector } from "react-redux";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import BackButton from "./BackButton";
import WorkingDays from "./WorkingDays";

const dbRef = firestore().collection("appointments");

const doctorSelector = (state) => {
  const { doctors, currentDoctor, specialties } = state.doctors;
  if (!doctors) return null;
  const specialtyId = doctors[currentDoctor].specialty;
  const doctorId = currentDoctor;
  const doctor = {
    ...doctors[currentDoctor],
    doctorId,
    startHour: `${addZero(
      parseInt(doctors[currentDoctor].startHour.split(":")[0])
    )}:${doctors[currentDoctor].startHour.split(":")[1]}`,
    endHour: `${addZero(
      parseInt(doctors[currentDoctor].endHour.split(":")[0])
    )}:${doctors[currentDoctor].endHour.split(":")[1]}`,
    specialty: {
      id: specialtyId,
      specialty: specialties[specialtyId].specialty,
    },
  };
  return doctor;
};

const addZero = (i) => {
  if (i < 10) {
    // eslint-disable-next-line no-param-reassign
    i = `0${i}`;
  }
  return i;
};

const getDocId = (state) => {
  const { currentDoctor } = state.doctors;
  return currentDoctor;
};

const getCurrentId = () => {
  const { currentUser } = auth();

  return currentUser.uid;
};

const getRealTime = new Promise((resolve) => {
  const url =
    "http://api.timezonedb.com/v2.1/get-time-zone?key=UH71AHONZZAD&format=json&by=zone&zone=America/Caracas";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      resolve(data);
    });
});

const createAppointment = ({ navigation }) => {
  const currentId = getCurrentId();
  const PassId = useSelector(getDocId);
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentText, setAppointmentText] = useState("");
  const [appointmentEndTime, setAppointmentEndTime] = useState("");
  const [appointmentDateDB, setAppointmentDateDB] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const doctor = useSelector(doctorSelector);
  if (!doctor) return null;
  const PassSpecialty = doctor.specialty.id;
  const PassClinic = doctor.idClinic;
  const PassSH = doctor.startHour;
  const PassEH = doctor.endHour;

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log(date.getDay());
    if (doctor.workingDays.includes(date.getDay())) {
      setAppointmentDateDB(date);
      setAppointmentDate(date.toLocaleDateString("en-GB"));
      hideDatePicker();
    } else {
      hideDatePicker();
      Alert.alert(
        "Lo sentimos",
        "El médico no labora en el día selecionado. Por favor seleccione otro día.",
        [
          {
            text: "Aceptar",
          },
        ],
        { cancelable: false }
      );
    }
  };

  const handleAppointment = async () => {
    const getOtherAppointments = new Promise((resolve) => {
      let count = 0;
      const newDate = appointmentDate;
      const newStartHour = appointmentTime;
      const newDoc = PassId;
      dbRef
        .where("startHour", "==", newStartHour)
        .where("doctorId", "==", newDoc)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const otherDate = (doc.id, " => ", doc.data().date);
            if (otherDate.toDate().toLocaleDateString("en-GB") === newDate) {
              count++;
            }
          });
        })
        .then(() => {
          resolve(count);
        });
    });

    const realTimeRes = await getRealTime;
    const realTime =
      realTimeRes.status === "OK"
        ? new Date(realTimeRes.formatted)
        : new Date();
    const UniqueAppointmentRes = await getOtherAppointments;
    const UniqueAppointment =
      UniqueAppointmentRes.status === "OK"
        ? UniqueAppointmentRes
        : UniqueAppointmentRes;
    if (!validateDateTime(realTime)) return dateError();
    if (!validateAppointmentText()) return textError();
    if (!validateDoctorSchedule()) return ScheduleError();
    if (UniqueAppointment > 0) return uniqueError();

    // Create function to send appointment to firestore and insert here below

    dbRef
      .add({
        date: appointmentDateDB,
        startHour: appointmentTime,
        observations: appointmentText,
        doctorId: PassId,
        userId: currentId,
        specialtyId: PassSpecialty,
        endHour: appointmentEndTime,
        clinic: PassClinic,
      })
      .then((res) => {
        setAppointmentDateDB("");
        setAppointmentDate("");
        setAppointmentText("");
        setAppointmentTime("");
        setAppointmentEndTime("");
        navigation.navigate("Appointments");
      });
    return console.log(`Appointment Created`);
  };

  const validateDateTime = (date) => {
    let isValid = true;
    if (appointmentDate === "" || appointmentTime === "") isValid = false;
    if (
      appointmentDate === date.toLocaleDateString("en-GB") &&
      appointmentTime <
        date.toLocaleTimeString(["fr-FR"], {
          hour: "2-digit",
          minute: "2-digit",
        })
    ) {
      isValid = false;
    }
    return isValid;
  };

  const validateDoctorSchedule = () => {
    let isValid = true;

    if (
      appointmentTime < PassSH ||
      appointmentTime > PassEH ||
      appointmentEndTime < PassSH ||
      appointmentEndTime > PassEH
    ) {
      isValid = false;
    }
    return isValid;
  };

  const validateAppointmentText = () => appointmentText !== "";

  const dateError = () => {
    Alert.alert(
      "Algo ha salido mal",
      "Por favor ingrese una fecha y hora válidas para su cita",
      [
        {
          text: "Aceptar",
        },
      ],
      { cancelable: false }
    );
  };

  const uniqueError = () => {
    Alert.alert(
      "El médico seleccionado ya posee una cita programada para esta hora.",
      "Por favor ingrese una fecha y hora distinta para su cita",
      [
        {
          text: "Aceptar",
        },
      ],
      { cancelable: false }
    );
  };

  const ScheduleError = () => {
    Alert.alert(
      "Algo ha salido mal",
      "La hora ingresada se encuentra fuera del horario de disponibilidad del médico.",
      [
        {
          text: "Aceptar",
        },
      ],
      { cancelable: false }
    );
  };

  const textError = () => {
    Alert.alert(
      "Algo ha salido mal",
      "Por favor ingrese observaciones sobre su estado y sintomas actuales para que su médico pueda ir analizando su caso",
      [
        {
          text: "Aceptar",
        },
      ],
      { cancelable: false }
    );
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmTime = (time) => {
    setAppointmentTime(
      time.toLocaleTimeString(["fr-FR"], { hour: "2-digit", minute: "2-digit" })
    );

    const hym = [];
    let endTime = "";
    hym.push(
      time
        .toLocaleTimeString(["fr-FR"], { hour: "2-digit", minute: "2-digit" })
        .substring(0, 2)
    );
    hym.push(
      time
        .toLocaleTimeString(["fr-FR"], { hour: "2-digit", minute: "2-digit" })
        .substring(3, 5)
    );
    hym[0] = parseInt(hym[0], 10);
    hym[1] = parseInt(hym[1], 10);

    if (hym[1] === 30) {
      if (hym[0] < 23) hym[0] += 1;
      else hym[0] = 0;
      hym[1] = "00";
      if (hym[0] < 10) hym[0] = `0${hym[0]}`;
    } else {
      hym[1] = 30;
      if (hym[0] < 10) hym[0] = `0${hym[0]}`;
    }
    endTime = `${hym[0]}:${hym[1]}`;
    setAppointmentEndTime(endTime);
    hideTimePicker();
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient style={styles.container} colors={["#3867B4", "#0F94B4"]}>
        <View style={styles.header}>
          <BackButton navigation={navigation} />
          <Text style={styles.title}>Agendar una cita</Text>
        </View>
      </LinearGradient>
      <ScrollView>
        <View style={{ flexDirection: "row", width: "100%" }}>
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
        <WorkingDays workingDays={doctor.workingDays} />
        <View style={styles.body}>
          <View>
            <View style={styles.inline}>
              <Icon
                name="calendar-sharp"
                size={60}
                style={{ paddingRight: 40 }}
                color="#3a6ab1"
              />
              <View style={styles.column}>
                <TouchableHighlight
                  onPress={showDatePicker}
                  style={styles.modalButton}
                >
                  <Text style={styles.selectText}>
                    Seleccione fecha de su cita
                  </Text>
                </TouchableHighlight>

                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                  minimumDate={new Date()}
                />

                <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                  {appointmentDate}
                </Text>
              </View>
            </View>

            <View style={styles.inline}>
              <Icon
                name="time-sharp"
                size={60}
                style={{ paddingRight: 40 }}
                color="#3a6ab1"
              />
              <View style={styles.column}>
                <TouchableHighlight
                  onPress={showTimePicker}
                  style={styles.modalButton}
                >
                  <Text style={styles.selectText}>
                    Seleccione hora de su cita
                  </Text>
                </TouchableHighlight>

                <DateTimePickerModal
                  isVisible={isTimePickerVisible}
                  mode="time"
                  onConfirm={handleConfirmTime}
                  onCancel={hideTimePicker}
                  minuteInterval={30}
                  is24Hour
                />
                <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                  {`${appointmentTime} - ${appointmentEndTime}`}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ alignItems: "center", marginTop: 15, flex: 1 }}>
            <Text style={{ fontWeight: "bold", fontSize: 17 }}>
              Observaciones
            </Text>
            <TextInput
              multiline
              numberOfLines={10}
              style={styles.textInput}
              onChangeText={(texto) => setAppointmentText(texto)}
              value={appointmentText}
              placeholder="Escriba sus observaciones"
            />
          </View>

          <View>
            <TouchableHighlight
              onPress={handleAppointment}
              style={styles.modalButton}
            >
              <Text style={styles.selectText}>Agendar cita</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
  body: {
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flex: 1,
  },
  inline: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  selectText: {
    color: "white",
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 13,
  },
  row: {
    flexDirection: "column",
  },
  textInput: {
    justifyContent: "flex-start",
    padding: 10,
    marginVertical: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#3a6ab1",
    flex: 1,
    width: "100%",
    textAlignVertical: "top",
  },
  createAppointmentText: {
    color: "white",
    backgroundColor: "#3a6ab1",
    borderRadius: 5,
    marginLeft: "5%",
    padding: 4,
    textAlign: "center",
  },
  container: {
    padding: 20,
    paddingBottom: 0,
    paddingTop: 40,
  },
  modalButton: {
    padding: 10,
    backgroundColor: "#3a6ab1",
    borderRadius: 10,
    marginBottom: 5,
  },
  column: {
    flex: 1,
  },
  font: {
    color: "white",
    fontSize: 16,
    paddingLeft: 15,

    fontFamily: "helvetic",
  },
  appointmentInfo: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#2c99bb",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default createAppointment;
