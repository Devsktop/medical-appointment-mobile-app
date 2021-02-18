import React from "react";
import { useSelector } from "react-redux";
import { Text, View, StyleSheet, ScrollView } from "react-native";

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
  console.log(doctors);
  return (
    <ScrollView>
      <View>
        <Text>Hola mundo</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 0,
    paddingTop: 40,
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
