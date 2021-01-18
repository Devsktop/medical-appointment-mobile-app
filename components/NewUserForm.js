import React, { useState, useEffect } from "react";
import { Text, View, TouchableHighlight, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import auth from "@react-native-firebase/auth";
import globalStyles from "../styles";
import StepsIndicator from "./NewUserStepsIndicator";

const NewUserForm = ({ navigation }) => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [userData, setUserData] = useState({
    names: "",
    lastNames: "",
    dni: "",
    bornDate: "",
    weight: "",
    height: "",
    bloodType: "",
    medicalHistory: {
      vih: false,
      obesity: false,
      anemia: false,
      bleedingDisorders: false,
      peripheralVascularDisease: false,
      rheumatoidArthritis: false,
      heartFailure: false,
      renalFailure: false,
      coronaryDisease: false,
      bronchialAsthma: false,
      obstructiveLungDisease: false,
      depression: false,
      diabetes: false,
      arterialHypertension: false,
      hypothyroidism: false,
      liverDisease: false,
      lymphoma: false,
      neurologicalDisorders: false,
      cancer: false,
      paralysis: false,
      smoker: false,
      alcoholic: false,
      drugAddict: false,
      gestationState: false,
      nursing: false,
      disability: false,
    },
  });
  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      if (e.data.action.type !== "GO_BACK") navigation.dispatch(e.data.action);
      e.preventDefault();
    });
  }, [navigation]);

  const logout = () => {
    auth().signOut();
  };

  const handleScreenChange = (action) => {
    if (action === "add" && currentScreen < 6)
      setCurrentScreen(currentScreen + 1);
    else if (action === "less" && currentScreen > 0)
      setCurrentScreen(currentScreen - 1);
  };

  return (
    <LinearGradient
      colors={["#3867B4", "#0F94B4"]}
      style={[globalStyles.container, styles.container]}
    >
      <View>
        <Text style={globalStyles.screenTitle}>Registro de paciente</Text>
        <StepsIndicator current={currentScreen} />
      </View>
      <View>
        <Text>{currentScreen}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          underlayColor="#2985b3"
          style={[globalStyles.button, globalStyles.lightButton]}
          onPress={() => handleScreenChange("add")}
        >
          <Text style={[globalStyles.buttonText, globalStyles.lightButtonText]}>
            Siguiente
          </Text>
        </TouchableHighlight>
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
            onPress={() => handleScreenChange("less")}
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
});

export default NewUserForm;
