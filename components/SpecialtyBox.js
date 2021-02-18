import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";

import * as RootNavigation from "../RootNavigation";

// Actions
import { selectSpecialty } from "../redux/actions/doctorsActions";

const Specialties = ({ specialties, id }) => {
  const dispatch = useDispatch();
  const handleSelectSpecialty = () => {
    dispatch(selectSpecialty(id));
    RootNavigation.navigate("Doctors");
  };
  return (
    <TouchableWithoutFeedback onPress={handleSelectSpecialty}>
      <View style={[styles.specialty]}>
        <ImageBackground
          source={{ uri: specialties.imageUrl }}
          style={{
            width: "100%",
            height: 130,
            justifyContent: "flex-end",
          }}
        >
          <Text style={styles.specialtyText}>{specialties.specialty}</Text>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  specialty: {
    width: "48%",
    height: 120,
    marginVertical: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  specialtyText: {
    paddingVertical: 5,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: "rgba(0,0,0,.5)",
    marginRight: 20,
    marginBottom: 3,
    borderTopRightRadius: 10,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Specialties;
