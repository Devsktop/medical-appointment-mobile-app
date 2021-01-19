import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  TextInput,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import auth from "@react-native-firebase/auth";
import DateTimePickerModal from "react-native-modal-datetime-picker";
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
    console.log(userData);
    if (action === "add" && currentScreen < 6)
      setCurrentScreen(currentScreen + 1);
    else if (action === "less" && currentScreen > 0)
      setCurrentScreen(currentScreen - 1);
  };

  const handleFormChange = (value, name, type) => {
    if (type === "user") {
      setUserData({ ...userData, [name]: value });
    }
  };

  let ScreenForm = <Text>Hola mundo</Text>;

  if (currentScreen === 0)
    ScreenForm = (
      <PersonalDataForm
        userData={userData}
        handleFormChange={handleFormChange}
      />
    );

  return (
    <LinearGradient
      colors={["#3867B4", "#0F94B4"]}
      style={[globalStyles.container, styles.container]}
    >
      <View>
        <Text style={globalStyles.screenTitle}>Registro de paciente</Text>
        <StepsIndicator current={currentScreen} />
      </View>

      <View style={styles.contentContainer}>{ScreenForm}</View>

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
  contentContainer: {
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

const PersonalDataForm = ({ userData, handleFormChange }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log(new Date());
    handleFormChange(date, "bornDate", "user");
    hideDatePicker();
  };

  return (
    <View>
      <View style={globalStyles.inputBox}>
        <TextInput
          style={globalStyles.inputField}
          autoCapitalize="none"
          placeholder="Ingrese sus nombres"
          placeholderTextColor="#b8b8b8"
          onChangeText={(names) => handleFormChange(names, "names", "user")}
          value={userData.names}
        />
      </View>
      <View style={globalStyles.inputBox}>
        <TextInput
          style={globalStyles.inputField}
          autoCapitalize="none"
          placeholder="Ingrese sus apellidos"
          placeholderTextColor="#b8b8b8"
          onChangeText={(lastNames) =>
            handleFormChange(lastNames, "lastNames", "user")}
          value={userData.lastNames}
        />
      </View>
      <View style={globalStyles.inputBox}>
        <TextInput
          style={globalStyles.inputField}
          autoCapitalize="none"
          placeholder="Ingrese su documento de identidad"
          placeholderTextColor="#b8b8b8"
          onChangeText={(dni) => handleFormChange(dni, "dni", "user")}
          value={userData.dni}
        />
      </View>
      <View>
        <TouchableHighlight
          style={[globalStyles.button, globalStyles.darkButton]}
          onPress={showDatePicker}
        >
          <Text style={globalStyles.buttonText}>Fecha de nacimiento</Text>
        </TouchableHighlight>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        {userData.bornDate !== "" && (
          <View
            style={[
              globalStyles.button,
              globalStyles.lightButton,
              styles.dateBox,
            ]}
          >
            <Text
              style={[
                globalStyles.buttonText,
                globalStyles.lightButtonText,
                styles.dateText,
              ]}
            >
              {userData.bornDate.toLocaleDateString()}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
