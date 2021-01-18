import React from "react";
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Image,
} from "react-native";
import globalStyles from "../styles";

const logo = require("../assets/logo.png");

const LoginCotroller = ({ setScreen }) => {
  return (
    <>
      <View style={styles.imageContainer}>
        <Image source={logo} />
        <Text style={styles.bigText}>
          Agenda tu consulta en tu teléfono en minutos
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          underlayColor={"#2985b3"}
          style={[globalStyles.button, styles.loginButton]}
          onPress={() => setScreen("login")}
        >
          <Text style={globalStyles.buttonText}>Iniciar Sesión</Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={"#2985b3"}
          style={[globalStyles.button, globalStyles.darkButton]}
          onPress={() => setScreen("signup")}
        >
          <Text style={globalStyles.buttonText}>Nuevo Usuario</Text>
        </TouchableHighlight>
        <Text style={styles.littleText}>
          Al continuar acepta con nuestros términos y condiciones.
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 200,
  },
  bigText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    width: 280,
    marginVertical: 20,
  },
  buttonContainer: {
    width: "100%",
  },
  loginButton: {
    backgroundColor: "#31cad8",
  },
  littleText: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
  },
});
export default LoginCotroller;
