import React from "react";
import { useSelector } from "react-redux";
import { Text, View, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

// Components
import BackButton from "./BackButton";
import DoctorsSearchBar from "./DoctorsSearchBar";

const Doctors = ({ navigation }) => {
  const currentSpecialty = useSelector(
    (state) => state.doctors.currentSpecialty
  );

  return (
    <View>
      <LinearGradient style={styles.container} colors={["#3867B4", "#0F94B4"]}>
        <View style={styles.header}>
          <BackButton navigation={navigation} />
          <Text style={styles.title}>Búsqueda de doctor</Text>
        </View>
      </LinearGradient>
      <DoctorsSearchBar />
      <Text>{currentSpecialty}</Text>
    </View>
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

export default Doctors;
