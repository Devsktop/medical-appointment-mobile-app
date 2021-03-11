import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import auth from "@react-native-firebase/auth";

// Actions
import { setUserAction, logout } from "../redux/actions/UserAction";
import { setDoctorsData } from "../redux/actions/doctorsActions";
import { getAppointment } from "../redux/actions/appointmentsActions";

const Loading = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    auth().onAuthStateChanged(async (user) => {
      if (user) {
        await new Promise((resolve) =>
          resolve(dispatch(setUserAction(navigation)))
        );
        await new Promise((resolve) => resolve(dispatch(setDoctorsData())));
        await new Promise((resolve) => resolve(dispatch(getAppointment())));
      } else {
        dispatch(logout());
      }
      navigation.navigate(user ? "Main" : "LoginController");
    });
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#669df6" />
      <Text style={styles.text}>Cargando datos</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 5,
    color: "gray",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Loading;
