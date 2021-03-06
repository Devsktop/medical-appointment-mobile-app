import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  ActivityIndicator,
} from "react-native";
import LoginWelcome from "./LoginWelcome";
import Login from "./Login";
import SignUp from "./SignUp";
import globalStyles from "../styles";

const background = require("../assets/login_img.jpg");

const LoginCotroller = ({ navigation }) => {
  const [screen, setScreen] = useState("init");

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      if (e.data.action.type !== "GO_BACK") navigation.dispatch(e.data.action);
      e.preventDefault();
    });
  }, [navigation]);

  useEffect(() => {
    const focusListener = navigation.addListener("blur", () => {
      setScreen("init");
    });
    return focusListener;
  }, []);

  let currentScreen;

  if (screen === "init")
    currentScreen = (
      <LoginWelcome navigation={navigation} setScreen={setScreen} />
    );
  else if (screen === "login") currentScreen = <Login setScreen={setScreen} />;
  else if (screen === "signup")
    currentScreen = <SignUp navigation={navigation} setScreen={setScreen} />;
  else if (screen === "loading")
    currentScreen = (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );

  return (
    <ImageBackground
      source={background}
      style={[globalStyles.container, styles.container]}
    >
      {currentScreen}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    padding: 2,
    backgroundColor: "#fff",
    borderRadius: 100,
  },
});
export default LoginCotroller;
