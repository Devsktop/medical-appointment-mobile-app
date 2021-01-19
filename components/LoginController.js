import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { StyleSheet, ImageBackground } from "react-native";
=======
import {
  StyleSheet,
  ImageBackground,
  View,
  ActivityIndicator,
} from "react-native";
>>>>>>> 15ac57b2359916338980f375b4098baf8e332833
import LoginWelcome from "./LoginWelcome";
import Login from "./Login";
import SignUp from "./SignUp";
import globalStyles from "../styles";

const background = require("../assets/login_img.jpg");

const LoginCotroller = ({ navigation }) => {
  const [screen, setScreen] = useState("init");

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
<<<<<<< HEAD
=======
      if (e.data.action.type !== "GO_BACK") navigation.dispatch(e.data.action);
>>>>>>> 15ac57b2359916338980f375b4098baf8e332833
      e.preventDefault();
    });
  }, [navigation]);

<<<<<<< HEAD
  let currentScreen;

  if (screen === "init") currentScreen = <LoginWelcome setScreen={setScreen} />;
  else if (screen === "login") currentScreen = <Login setScreen={setScreen} />;
  else if (screen === "signup")
    currentScreen = <SignUp setScreen={setScreen} />;
=======
  useEffect(() => {
    console.log("renderizé controler");
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
>>>>>>> 15ac57b2359916338980f375b4098baf8e332833

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
<<<<<<< HEAD
=======
  loading: {
    padding: 2,
    backgroundColor: "#fff",
    borderRadius: 100,
  },
>>>>>>> 15ac57b2359916338980f375b4098baf8e332833
});
export default LoginCotroller;
