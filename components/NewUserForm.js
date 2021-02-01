import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Alert,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import auth from "@react-native-firebase/auth";
import globalStyles from "../styles";
import StepsIndicator from "./NewUserStepsIndicator";

// Forms
import PersonalDataForm from "./newUserForms/PersonalDataForm";
import MedicalDataForm from "./newUserForms/MedicalDataForm";
import MedicalHistoryOne from "./newUserForms/MedicalHistoryOne";
import MedicalHistoryTwo from "./newUserForms/MedicalHistoryTwo";
import MedicalHistoryThree from "./newUserForms/MedicalHistoryThree";
import SpecialCondition from "./newUserForms/SpecialCondition";

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
      vih: null,
      obesity: null,
      anemia: null,
      bleedingDisorders: null,
      peripheralVascularDisease: null,
      rheumatoidArthritis: null,
      heartFailure: null,
      renalFailure: null,
      coronaryDisease: null,
      bronchialAsthma: null,
      obstructiveLungDisease: null,
      PulmonaryCirculationDisorder: null,
      depression: null,
      diabetes: null,
      arterialHypertension: null,
      hypothyroidism: null,
      liverDisease: null,
      lymphoma: null,
      neurologicalDisorders: null,
      cancer: null,
      paralysis: null,
      smoker: null,
      alcoholic: null,
      drugAddict: null,
      gestationState: null,
      nursing: null,
      disability: null,
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
    console.log(userData);
    if (action === "add" && currentScreen < 5)
      setCurrentScreen(currentScreen + 1);
    else if (action === "less" && currentScreen > 0)
      setCurrentScreen(currentScreen - 1);
  };

  const handleSubmitForm = () => {
    let isValid = true;
    const {
      names,
      lastNames,
      dni,
      bornDate,
      weight,
      height,
      bloodType,
      medicalHistory,
    } = userData;

    if (
      names.trim() === "" ||
      lastNames.trim() === "" ||
      dni.trim() === "" ||
      bornDate.trim() === "" ||
      weight.trim() === "" ||
      height.trim() === "" ||
      bloodType.trim() === ""
    )
      isValid = false;

    Object.keys(medicalHistory).forEach((key) => {
      if (medicalHistory[key] === null) isValid = false;
    });

    if (isValid) {
      // Do database set and go to main screen
    } else {
      Alert.alert("Debe rellenar todos los datos para continuar");
    }
  };

  const handleFormChange = (value, name, type) => {
    if (type === "user" && validInputs(value, name)) {
      setUserData({ ...userData, [name]: value });
    } else if (type === "history") {
      setUserData({
        ...userData,
        medicalHistory: { ...userData.medicalHistory, [name]: value },
      });
    }
  };

  const validInputs = (value, name) => {
    const containLetters = /\D/;
    const containNumbers = /\d/;
    if (
      (name === "names" || name === "lastNames") &&
      containNumbers.test(value)
    )
      return false;
    if (
      (name === "dni" || name === "weight" || name === "height") &&
      containLetters.test(value)
    )
      return false;

    return true;
  };

  let ScreenForm = <Text>Hola mundo</Text>;

  if (currentScreen === 0) {
    ScreenForm = (
      <PersonalDataForm
        userData={userData}
        handleFormChange={handleFormChange}
      />
    );
  } else if (currentScreen === 1) {
    ScreenForm = (
      <MedicalDataForm
        userData={userData}
        handleFormChange={handleFormChange}
      />
    );
  } else if (currentScreen === 2) {
    ScreenForm = (
      <MedicalHistoryOne
        userData={userData}
        handleFormChange={handleFormChange}
      />
    );
  } else if (currentScreen === 3) {
    ScreenForm = (
      <MedicalHistoryTwo
        userData={userData}
        handleFormChange={handleFormChange}
      />
    );
  } else if (currentScreen === 4) {
    ScreenForm = (
      <MedicalHistoryThree
        userData={userData}
        handleFormChange={handleFormChange}
      />
    );
  } else if (currentScreen === 5) {
    ScreenForm = (
      <SpecialCondition
        userData={userData}
        handleFormChange={handleFormChange}
      />
    );
  }

  return (
    <LinearGradient
      colors={["#3867B4", "#0F94B4"]}
      style={[globalStyles.container, styles.container]}
    >
      <View>
        <Text style={globalStyles.screenTitle}>Registro de paciente</Text>
        <StepsIndicator cant={5} current={currentScreen} />
      </View>

      <View style={styles.contentContainer}>{ScreenForm}</View>

      <View style={styles.buttonContainer}>
        {currentScreen === 5 ? (
          <TouchableHighlight
            underlayColor="#2985b3"
            style={[globalStyles.button, globalStyles.lightButton]}
            onPress={() => handleSubmitForm()}
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
            onPress={() => handleScreenChange("add")}
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
