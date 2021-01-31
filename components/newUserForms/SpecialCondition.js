import React from "react";
import { Text, View, StyleSheet } from "react-native";
import globalStyles from "../../styles";

import RadioButton from "../RadioButton";

const SpecialCondition = ({ userData, handleFormChange }) => (
  <View style={styles.container}>
    <Text style={styles.bloodTypeTitle}>Condiciones especiales</Text>
    <View style={globalStyles.inputBox}>
      <View style={styles.radioButtonContainer}>
        {/* Desc 1 */}
        <View style={styles.radioButtonDescBox}>
          <Text style={styles.radioButtonDesc}>En estado de gestación</Text>
          <View style={styles.radioButtonRow}>
            <RadioButton
              label="Sí"
              checked={userData.medicalHistory.gestationState}
              onPress={() =>
                handleFormChange(true, "gestationState", "history")}
            />
            <RadioButton
              label="No"
              checked={userData.medicalHistory.gestationState === false}
              onPress={() =>
                handleFormChange(false, "gestationState", "history")}
            />
          </View>
        </View>
        {/* Desc 2 */}
        <View style={styles.radioButtonDescBox}>
          <Text style={styles.radioButtonDesc}>Lactando</Text>
          <View style={styles.radioButtonRow}>
            <RadioButton
              label="Sí"
              checked={userData.medicalHistory.nursing}
              onPress={() => handleFormChange(true, "nursing", "history")}
            />
            <RadioButton
              label="No"
              checked={userData.medicalHistory.nursing === false}
              onPress={() => handleFormChange(false, "nursing", "history")}
            />
          </View>
        </View>
        {/* Desc 3 */}
        <View style={styles.radioButtonDescBox}>
          <Text style={styles.radioButtonDesc}>
            Discapacidad severa o crónica
          </Text>
          <View style={styles.radioButtonRow}>
            <RadioButton
              label="Sí"
              checked={userData.medicalHistory.disability}
              onPress={() => handleFormChange(true, "disability", "history")}
            />
            <RadioButton
              label="No"
              checked={userData.medicalHistory.disability === false}
              onPress={() => handleFormChange(false, "disability", "history")}
            />
          </View>
        </View>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    marginBottom: 200,
  },
  bloodTypeTitle: {
    textTransform: "uppercase",
    color: "white",
  },
  radioButtonRow: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "flex-start",
    width: "50%",
  },
  radioButtonContainer: {
    paddingHorizontal: 20,
  },
  radioButtonDescBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  radioButtonDesc: {
    color: "white",
    fontWeight: "bold",
    width: "50%",
  },
});

export default SpecialCondition;
