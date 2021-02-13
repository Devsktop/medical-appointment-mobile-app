import React, { useState } from "react";
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  TextInput,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import globalStyles from "../../styles";

// Components
import RadioButton from "../RadioButton";

const PersonalDataForm = ({ userData, handleFormChange }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
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
            handleFormChange(lastNames, "lastNames", "user")
          }
          value={userData.lastNames}
        />
      </View>
      <View style={globalStyles.inputBox}>
        <TextInput
          style={globalStyles.inputField}
          autoCapitalize="none"
          placeholder="Ingrese su documento de identidad"
          keyboardType="numeric"
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
      <View style={globalStyles.inputBox}>
        <Text style={styles.genderTitle}>Genero Sexual</Text>
        <View style={styles.radioButtonContainer}>
          <View style={styles.radioButtonRow}>
            <RadioButton
              label="Masculino"
              checked={userData.gender === "male"}
              onPress={() => handleFormChange("male", "gender", "user")}
            />
            <RadioButton
              label="Femenino"
              checked={userData.gender === "female"}
              onPress={() => handleFormChange("female", "gender", "user")}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dateText: {
    fontSize: 18,
  },
  dateBox: {
    backgroundColor: "rgba(255,255,255,.6)",
  },
  genderTitle: {
    textTransform: "uppercase",
    color: "white",
  },
  radioButtonRow: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between",
  },
  radioButtonContainer: {
    paddingHorizontal: 10,
  },
});

export default PersonalDataForm;
