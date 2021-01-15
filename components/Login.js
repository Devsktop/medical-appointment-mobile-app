/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Alert,
} from "react-native";
import auth from "@react-native-firebase/auth";
import globalStyles from "../styles";

const Login = ({ navigation, setScreen }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleLogin = () => {
    const { email, password } = user;

    if (!(!/\S+@\S+\.\S+/.test(email.trim()) || password.trim() === "")) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => navigation.navigate("Main"))
        .catch((error) => {
          console.log(error.code);
          Alert.alert("Lo sentimos", loginErrorHandle(error.code), [
            {
              text: "Aceptar",
            },
          ]);
          // setErrorMessage(loginErrorHandle(error.code));
        });
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
        <View style={globalStyles.inputBox}>
          <TextInput
            style={globalStyles.inputField}
            autoCapitalize="none"
            placeholder="Ingrese su correo"
            placeholderTextColor="#b8b8b8"
            onChangeText={(email) => handleOnChange(email, "email")}
            value={user.email}
          />
        </View>
        <View style={globalStyles.inputBox}>
          <TextInput
            secureTextEntry
            style={globalStyles.inputField}
            autoCapitalize="none"
            placeholder="Ingrese su contraseña"
            placeholderTextColor="#b8b8b8"
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
          onPress={() => setScreen("signup")}
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

const loginErrorHandle = (err) => {
  switch (err) {
    case "auth/email-already-exists":
      return "Este correo ya está siendo usado por otro usuario";
    case err.userDisabled:
      return "Este usuario ha sido deshabilitado";
    case err.operationNotAllowed:
      return "Operación no permitida";
    case err.invalidEmail:
      return "Correo electrónico no valido";
    case "auth/wrong-password":
      return "Contraseña incorrecta";
    case "auth/user-not-found":
      return "No se encontró cuenta del usuario con el correo especificado";
    case err.networkError:
      return "Promblema al intentar conectar al servidor";
    case err.weakPassword:
      return "Contraseña muy debil o no válida";
    case err.missingEmail:
      return "Hace falta registrar un correo electrónico";
    case err.internalError:
      return "Error interno";
    case err.invalidCustomToken:
      return "Token personalizado invalido";
    case "auth/too-many-requests":
      return "Ha intentado esta acción demasiada veces. Espere un momento e intentelo nuevamente más tarde.";
    default:
      return "algo ha ido mal";
  }
};

export default Login;
