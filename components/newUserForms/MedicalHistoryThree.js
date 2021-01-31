import React from "react";
import { Text, View, StyleSheet } from "react-native";
import globalStyles from "../../styles";

import RadioButton from "../RadioButton";

const MedicalHistoryThree = ({ userData, handleFormChange }) => (
  <View>
    <Text style={styles.bloodTypeTitle}>Antecedentes médicos</Text>
    <View style={globalStyles.inputBox}>
      <View style={styles.radioButtonContainer}>
        {/* Desc 1 */}
        <View style={styles.radioButtonDescBox}>
          <Text style={styles.radioButtonDesc}>Enfermedad hepática</Text>
          <View style={styles.radioButtonRow}>
            <RadioButton
              label="Sí"
              checked={userData.medicalHistory.liverDisease}
              onPress={() => handleFormChange(true, "liverDisease", "history")}
            />
            <RadioButton
              label="No"
              checked={userData.medicalHistory.liverDisease === false}
              onPress={() => handleFormChange(false, "liverDisease", "history")}
            />
          </View>
        </View>
        {/* Desc 2 */}
        <View style={styles.radioButtonDescBox}>
          <Text style={styles.radioButtonDesc}>Linfoma</Text>
          <View style={styles.radioButtonRow}>
            <RadioButton
              label="Sí"
              checked={userData.medicalHistory.lymphoma}
              onPress={() => handleFormChange(true, "lymphoma", "history")}
            />
            <RadioButton
              label="No"
              checked={userData.medicalHistory.lymphoma === false}
              onPress={() => handleFormChange(false, "lymphoma", "history")}
            />
          </View>
        </View>
        {/* Desc 3 */}
        <View style={styles.radioButtonDescBox}>
          <Text style={styles.radioButtonDesc}>Trastornos neurológicos</Text>
          <View style={styles.radioButtonRow}>
            <RadioButton
              label="Sí"
              checked={userData.medicalHistory.neurologicalDisorders}
              onPress={() =>
                handleFormChange(true, "neurologicalDisorders", "history")}
            />
            <RadioButton
              label="No"
              checked={userData.medicalHistory.neurologicalDisorders === false}
              onPress={() =>
                handleFormChange(false, "neurologicalDisorders", "history")}
            />
          </View>
        </View>
        {/* Desc 8 */}
        <View style={styles.radioButtonDescBox}>
          <Text style={styles.radioButtonDesc}>Cáncer</Text>
          <View style={styles.radioButtonRow}>
            <RadioButton
              label="Sí"
              checked={userData.medicalHistory.cancer}
              onPress={() => handleFormChange(true, "cancer", "history")}
            />
            <RadioButton
              label="No"
              checked={userData.medicalHistory.cancer === false}
              onPress={() => handleFormChange(false, "cancer", "history")}
            />
          </View>
        </View>
        {/* Desc 4 */}
        <View style={styles.radioButtonDescBox}>
          <Text style={styles.radioButtonDesc}>Parálisis</Text>
          <View style={styles.radioButtonRow}>
            <RadioButton
              label="Sí"
              checked={userData.medicalHistory.paralysis}
              onPress={() => handleFormChange(true, "paralysis", "history")}
            />
            <RadioButton
              label="No"
              checked={userData.medicalHistory.paralysis === false}
              onPress={() => handleFormChange(false, "paralysis", "history")}
            />
          </View>
        </View>
        {/* Desc 5 */}
        <View style={styles.radioButtonDescBox}>
          <Text style={styles.radioButtonDesc}>Fumador</Text>
          <View style={styles.radioButtonRow}>
            <RadioButton
              label="Sí"
              checked={userData.medicalHistory.smoker}
              onPress={() => handleFormChange(true, "smoker", "history")}
            />
            <RadioButton
              label="No"
              checked={userData.medicalHistory.smoker === false}
              onPress={() => handleFormChange(false, "smoker", "history")}
            />
          </View>
        </View>
        {/* Desc 6 */}
        <View style={styles.radioButtonDescBox}>
          <Text style={styles.radioButtonDesc}>Abuso de alcohol</Text>
          <View style={styles.radioButtonRow}>
            <RadioButton
              label="Sí"
              checked={userData.medicalHistory.alcoholic}
              onPress={() => handleFormChange(true, "alcoholic", "history")}
            />
            <RadioButton
              label="No"
              checked={userData.medicalHistory.alcoholic === false}
              onPress={() => handleFormChange(false, "alcoholic", "history")}
            />
          </View>
        </View>
        {/* Desc 7 */}
        <View style={styles.radioButtonDescBox}>
          <Text style={styles.radioButtonDesc}>Abuso de drogas</Text>
          <View style={styles.radioButtonRow}>
            <RadioButton
              label="Sí"
              checked={userData.medicalHistory.drugAddict}
              onPress={() => handleFormChange(true, "drugAddict", "history")}
            />
            <RadioButton
              label="No"
              checked={userData.medicalHistory.drugAddict === false}
              onPress={() => handleFormChange(false, "drugAddict", "history")}
            />
          </View>
        </View>

        {/* Cierre */}
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

export default MedicalHistoryThree;
