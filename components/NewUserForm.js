import React, { useState, useRef, useEffect } from "react";
import { Text, View, TouchableHighlight, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import globalStyles from "../styles";
import UserFormController from "./UserFormController";

// Actions
import { setUserAction } from "../redux/actions/UserAction";

const NewUserForm = ({ navigation }) => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const formRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      if (e.data.action.type !== "GO_BACK") navigation.dispatch(e.data.action);
      e.preventDefault();
    });
  }, [navigation]);

  const logout = () => {
    auth().signOut();
  };

  const onSubmit = (userData) => {
    const { currentUser } = auth();
    firestore()
      .collection("users")
      .doc(currentUser.uid)
      .update({
        isNewUser: false,
        userData,
      })
      .then(async () => {
        await new Promise((resolve) =>
          resolve(dispatch(setUserAction(navigation, "UserForm")))
        );
        navigation.navigate("Success");
      });
  };

  return (
    <LinearGradient
      colors={["#3867B4", "#0F94B4"]}
      style={[globalStyles.container, styles.container]}
    >
      <UserFormController
        onSubmit={onSubmit}
        title="Registro de paciente"
        ref={formRef}
        parentScreen={setCurrentScreen}
      />
      <View style={styles.buttonContainer}>
        {currentScreen === 5 ? (
          <TouchableHighlight
            underlayColor="#2985b3"
            style={[globalStyles.button, globalStyles.lightButton]}
            onPress={formRef.current.handleSubmitForm}
          >
            <Text
              style={[globalStyles.buttonText, globalStyles.lightButtonText]}
            >
              Finalizar
            </Text>
          </TouchableHighlight>
        ) : (
          <TouchableHighlight
            underlayColor="#2985b3"
            style={[globalStyles.button, globalStyles.lightButton]}
            onPress={() => formRef.current.handleScreenChange("add")}
          >
            <Text
              style={[globalStyles.buttonText, globalStyles.lightButtonText]}
            >
              Siguiente
            </Text>
          </TouchableHighlight>
        )}

        {currentScreen === 0 ? (
          <TouchableHighlight
            underlayColor="#2985b3"
            style={[globalStyles.button, globalStyles.darkButton]}
            onPress={logout}
          >
            <Text style={globalStyles.buttonText}>
              Iniciar Sesión con otra cuenta
            </Text>
          </TouchableHighlight>
        ) : (
          <TouchableHighlight
            underlayColor="#2985b3"
            style={[globalStyles.button, globalStyles.darkButton]}
            onPress={() => formRef.current.handleScreenChange("less")}
          >
            <Text style={globalStyles.buttonText}>Volver</Text>
          </TouchableHighlight>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
  },
  contentContainer: {
    justifyContent: "flex-start",
    width: "100%",
  },
  dateText: {
    fontSize: 18,
  },
  dateBox: {
    backgroundColor: "rgba(255,255,255,.6)",
  },
});

export default NewUserForm;
