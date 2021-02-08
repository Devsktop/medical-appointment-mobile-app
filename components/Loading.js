import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import auth from "@react-native-firebase/auth";
import { setUserAction } from "../redux/actions/UserAction";

const Loading = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    auth().onAuthStateChanged(async (user) => {
      if (user) {
        await new Promise((resolve) =>
          resolve(dispatch(setUserAction(navigation)))
        );
      }
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
