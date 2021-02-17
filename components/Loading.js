import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import auth from "@react-native-firebase/auth";

// Actions
import { setUserAction, logout } from "../redux/actions/UserAction";
import { setDoctorsData } from "../redux/actions/doctorsActions";

const Loading = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    auth().onAuthStateChanged(async (user) => {
      if (user) {
        await new Promise((resolve) =>
          resolve(dispatch(setUserAction(navigation)))
        );
        await new Promise((resolve) => resolve(dispatch(setDoctorsData())));
      } else {
        dispatch(logout());
      }
      console.log("loading");
      navigation.navigate(user ? "Main" : "LoginController");
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Loading esta vaina</Text>
      <ActivityIndicator size="large" color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loading;
