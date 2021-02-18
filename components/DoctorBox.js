import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const doctorIcon = require("../assets/doctor.svg");

const getDoctorNames = (doctor) => {
  const firstName = doctor.names.split(" ")[0];
  const lastName = doctor.lastNames.split(" ")[0];
  return `${firstName} ${lastName}`;
};

const DoctorsBox = ({ doctor }) => {
  console.log(doctor);
  return (
    <View style={styles.container}>
      <View>
        <Image source={doctorIcon} style={{ width: 30, height: 30 }} />
        <Text>{getDoctorNames(doctor)}</Text>
        <Text>sdfsdf</Text>
      </View>
      <Icon name="chevron-right" size={20} color="gray" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "red",
    height: 100,
  },
});

export default DoctorsBox;
