import React from "react";
import {useSelector} from 'react-redux'
import { Text, View, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

// Components
import BackButton from "./BackButton";
import SpecialtiesSearchBar from "./SpecialtiesSearchBar";
import SpecialtiesGrid from "./SpecialtiesGrid";

const Specialties = ({ navigation }) =>{
  const specialties = useSelector(state => state.doctors.specialties); 
  if(!specialties) return null;
  return (
  <View style={{flex: 1}}>
    <LinearGradient style={styles.container} colors={["#3867B4", "#0F94B4"]}>
      <View style={styles.header}>
        <BackButton navigation={navigation} />
        <Text style={styles.title}>Especialidades</Text>
      </View>
    </LinearGradient>
    <SpecialtiesSearchBar />
    <SpecialtiesGrid />
  </View>
);}

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

export default Specialties;
