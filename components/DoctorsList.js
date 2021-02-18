import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, ScrollView } from "react-native";

// Components
import DoctorBox from "./DoctorBox";

const doctorsSelectors = (state) => {
  const { doctors, doctorsFilter, currentSpecialty } = state.doctors;

  const doctorsBySpecialty = {};
  Object.keys(doctors).forEach((key) => {
    if (doctors[key].specialty === currentSpecialty)
      doctorsBySpecialty[key] = { ...doctors[key] };
  });

  const doctorsByName = {};
  Object.keys(doctorsBySpecialty).forEach((key) => {
    if (
      doctorsBySpecialty[key].names
        .toLowerCase()
        .indexOf(doctorsFilter.toLowerCase()) > -1 ||
      doctorsBySpecialty[key].lastNames
        .toLowerCase()
        .indexOf(doctorsFilter.toLowerCase()) > -1
    )
      doctorsByName[key] = { ...doctorsBySpecialty[key] };
  });
  return doctorsByName;
};

const DoctorsList = () => {
  const doctors = useSelector(doctorsSelectors);
  return (
    <ScrollView>
      <View style={styles.container}>
        {Object.keys(doctors).map((key, i) => {
          console.log(key);
          return (
            <DoctorBox doctor={doctors[key]} key={key} pair={i % 2 === 0} />
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default DoctorsList;
