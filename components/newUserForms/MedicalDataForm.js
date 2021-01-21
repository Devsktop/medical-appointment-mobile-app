import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import globalStyles from "../../styles";

import RadioButton from "../RadioButton";

const PersonalDataForm = ({ userData, handleFormChange }) => (
  <View>
    <View style={globalStyles.inputBox}>
      <TextInput
        style={globalStyles.inputField}
        autoCapitalize="none"
        placeholder="Peso"
        placeholderTextColor="#b8b8b8"
        onChangeText={(weight) => handleFormChange(weight, "weight", "user")}
        value={userData.weight}
      />
    </View>
    <View style={globalStyles.inputBox}>
      <TextInput
        style={globalStyles.inputField}
        autoCapitalize="none"
        placeholder="Altura"
        placeholderTextColor="#b8b8b8"
        onChangeText={(height) => handleFormChange(height, "height", "user")}
        value={userData.height}
      />
    </View>
    <View style={globalStyles.inputBox}>
      <Text style={styles.bloodTypeTitle}>Grupo sanguineo</Text>
      <View style={styles.radioButtonContainer}>
        <View style={styles.radioButtonRow}>
          <RadioButton
            label="No sé"
            checked={userData.bloodType === "unknown"}
            onPress={() => handleFormChange("unknown", "bloodType", "user")}
          />
        </View>
        <View style={styles.radioButtonRow}>
          <RadioButton
            label="A+"
            checked={userData.bloodType === "A+"}
            onPress={() => handleFormChange("A+", "bloodType", "user")}
          />
          <RadioButton
            label="A-"
            checked={userData.bloodType === "A-"}
            onPress={() => handleFormChange("A-", "bloodType", "user")}
          />
        </View>
        <View style={styles.radioButtonRow}>
          <RadioButton
            label="B+"
            checked={userData.bloodType === "B+"}
            onPress={() => handleFormChange("B+", "bloodType", "user")}
          />
          <RadioButton
            label="B-"
            checked={userData.bloodType === "B-"}
            onPress={() => handleFormChange("B-", "bloodType", "user")}
          />
        </View>
        <View style={styles.radioButtonRow}>
          <RadioButton
            label="O+"
            checked={userData.bloodType === "O+"}
            onPress={() => handleFormChange("O+", "bloodType", "user")}
          />
          <RadioButton
            label="O-"
            checked={userData.bloodType === "O-"}
            onPress={() => handleFormChange("O-", "bloodType", "user")}
          />
        </View>
        <View style={styles.radioButtonRow}>
          <RadioButton
            label="AB+"
            checked={userData.bloodType === "AB+"}
            onPress={() => handleFormChange("AB+", "bloodType", "user")}
          />
          <RadioButton
            label="AB-"
            checked={userData.bloodType === "AB-"}
            onPress={() => handleFormChange("AB-", "bloodType", "user")}
          />
        </View>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  bloodTypeTitle: {
    textTransform: "uppercase",
    color: "white",
  },
  radioButtonRow: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "flex-start",
  },
  radioButtonContainer: {
    paddingHorizontal: 40,
  },
});

export default PersonalDataForm;
