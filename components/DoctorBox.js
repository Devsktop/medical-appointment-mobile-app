import React from "react";
import { useDispatch } from "react-redux";
import { Text, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as RootNavigation from "../RootNavigation";

import DoctorIcon from "../assets/doctor.svg";

// Actions
import { selectDoctor } from "../redux/actions/doctorsActions";

const getDoctorNames = (doctor) => {
  const firstName = doctor.names.split(" ")[0];
  const lastName = doctor.lastNames.split(" ")[0];
  return `${firstName} ${lastName}`;
};

const DoctorsBox = ({ doctor, pair }) => {
  const dispatch = useDispatch();

  const handleSelectDoctor = () => {
    dispatch(selectDoctor(doctor.id));
    RootNavigation.navigate("DoctorProfile");
  };
  return (
    <TouchableWithoutFeedback onPress={handleSelectDoctor}>
      <View
        style={[
          styles.container,
          pair ? styles.backgroundWhite : styles.backgroundGray,
        ]}
      >
        <View style={styles.left}>
          <DoctorIcon width={50} height={50} />
          <Text style={styles.text}>{getDoctorNames(doctor)}</Text>
        </View>
        <Icon name="chevron-right" size={30} color="gray" />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    alignItems: "center",
    height: 80,
  },
  backgroundWhite: {
    backgroundColor: "#fff",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "gray",
    fontWeight: "700",
    fontSize: 18,
    marginLeft: 20,
  },
  backgroundGray: {
    backgroundColor: "#f7f7f7",
  },
});

export default DoctorsBox;
