/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from "react-native";
import auth from "@react-native-firebase/auth";
import globalStyles from "../styles";

const Login = ({ navigation, setScreen }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = () => {
    const { email, password } = user;

    if (!(!/\S+@\S+\.\S+/.test(email.trim()) || password.trim() === "")) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => navigation.navigate("Main"))
        .catch((error) => setErrorMessage(error.message));
    }
  };

  const handleOnChange = (value, name) => {
    setUser({ ...user, [name]: value.trim() });
    validateUser(value, name);
  };

  const validateUser = (value, name) => {
    const { email, password } = user;

    if (name === "email") {
      if (!/\S+@\S+\.\S+/.test(value.trim()) || password.trim() === "") {
        setButtonDisabled(true);
      } else setButtonDisabled(false);
    } else if (!/\S+@\S+\.\S+/.test(email.trim()) || value.trim() === "") {
      setButtonDisabled(true);
    } else setButtonDisabled(false);
  };

  return (
    <View style={[globalStyles.container, styles.container]}>
      <View>
        <Text style={globalStyles.screenTitle}>Iniciar Sesión</Text>
      </View>

      <View>
        {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}

        <View style={globalStyles.inputBox}>
          <TextInput
            style={globalStyles.inputField}
            autoCapitalize="none"
            placeholder="Email"
            onChangeText={(email) => handleOnChange(email, "email")}
            value={user.email}
          />
        </View>
        <View style={globalStyles.inputBox}>
          <TextInput
            secureTextEntry
            style={globalStyles.inputField}
            autoCapitalize="none"
            placeholder="Password"
            onChangeText={(password) => handleOnChange(password, "password")}
            value={user.password}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableHighlight
          underlayColor="#2985b3"
          style={[
            globalStyles.button,
            globalStyles.lightButton,
            buttonDisabled ? styles.buttonDisabled : "",
          ]}
          onPress={handleLogin}
          disabled={buttonDisabled}
        >
          <Text style={[globalStyles.buttonText, globalStyles.lightButtonText]}>
            Iniciar Sesión
          </Text>
        </TouchableHighlight>
        <Text style={styles.signupText}>¿No estás registrado aún?</Text>
        <TouchableHighlight
          underlayColor="#2985b3"
          style={[globalStyles.button, globalStyles.darkButton]}
          onPress={() => setScreen("login")}
        >
          <Text style={globalStyles.buttonText}>Registrate</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
    padding: 0,
  },
  buttonContainer: {
    width: "100%",
  },
  textInput: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8,
  },
  signupText: {
    textAlign: "center",
    color: "white",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});

export default Login;
