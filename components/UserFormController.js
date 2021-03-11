import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";

import globalStyles from "../styles";
import StepsIndicator from "./NewUserStepsIndicator";

// Forms
import PersonalDataForm from "./newUserForms/PersonalDataForm";
import MedicalDataForm from "./newUserForms/MedicalDataForm";
import MedicalHistoryOne from "./newUserForms/MedicalHistoryOne";
import MedicalHistoryTwo from "./newUserForms/MedicalHistoryTwo";
import MedicalHistoryThree from "./newUserForms/MedicalHistoryThree";
import SpecialCondition from "./newUserForms/SpecialCondition";

const UserFormController = forwardRef(
  ({ title, onSubmit, parentScreen, initUserData }, ref) => {
    const [currentScreen, setCurrentScreen] = useState(0);
    const [userData, setUserData] = useState(
      initUserData || {
        names: "",
        lastNames: "",
        dni: "",
        bornDate: "",
        gender: "",
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
      }
    );

    useImperativeHandle(ref, () => ({
      handleScreenChange,
      handleSubmitForm,
      currentScreen,
    }));

    const handleScreenChange = (action) => {
      if (action === "add" && currentScreen < 5) {
        setCurrentScreen(currentScreen + 1);
        parentScreen(currentScreen + 1);
      } else if (action === "less" && currentScreen > 0) {
        setCurrentScreen(currentScreen - 1);
        parentScreen(currentScreen - 1);
      }
    };

    const handleSubmitForm = () => {
      console.log(userData);
      let isValid = true;
      const {
        names,
        lastNames,
        dni,
        bornDate,
        gender,
        weight,
        height,
        bloodType,
        medicalHistory,
      } = userData;

      if (
        names.trim() === "" ||
        lastNames.trim() === "" ||
        dni.trim() === "" ||
        bornDate === "" ||
        gender === "" ||
        weight.trim() === "" ||
        height.trim() === "" ||
        bloodType.trim() === ""
      )
        isValid = false;

      Object.keys(medicalHistory).forEach((key) => {
        if (medicalHistory[key] === null) isValid = false;
      });

      if (isValid) {
        onSubmit(userData);
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
      <ScrollView>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View>
            <View>
              <Text style={globalStyles.screenTitle}>{title}</Text>
              <StepsIndicator cant={5} current={currentScreen} />
            </View>
            <View style={styles.contentContainer}>{ScreenForm}</View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
  }
);

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
});

UserFormController.displayName = "UserFormController";

export default UserFormController;
