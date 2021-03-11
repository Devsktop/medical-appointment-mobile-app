import React from "react";
import { Text, View, StyleSheet } from "react-native";
import globalStyles from "../../styles";

import RadioButton from "../RadioButton";

const MedicalHistoryTwo = ({ userData, handleFormChange }) => (
  <View>
    <Text style={styles.bloodTypeTitle}>Antecedentes médicos</Text>
    <View style={globalStyles.inputBox}>
      <View style={styles.radioButtonContainer}>
        {/* Desc 1 */}
        <View style={styles.radioButtonDescBox}>
          <Text style={styles.radioButtonDesc}>Enfermedad coronaria</Text>
          <View style={styles.radioButtonRow}>
            <RadioButton
              label="Sí"
              checked={userData.medicalHistory.coronaryDisease}
              onPress={() =>
                handleFormChange(true, "coronaryDisease", "history")}
            />
            <RadioButton
              label="No"
              checked={userData.medicalHistory.coronaryDisease === false}
              onPress={() =>
                handleFormChange(false, "coronaryDisease", "history")}
            />
          </View>
        </View>
        {/* Desc 2 */}
        <View style={styles.radioButtonDescBox}>
          <Text style={styles.radioButtonDesc}>Asma bronquial</Text>
          <View style={styles.radioButtonRow}>
            <RadioButton
              label="Sí"
              checked={userData.medicalHistory.bronchialAsthma}
              onPress={() =>
                handleFormChange(true, "bronchialAsthma", "history")}
            />
            <RadioButton
              label="No"
              checked={userData.medicalHistory.bronchialAsthma === false}
              onPress={() =>
                handleFormChange(false, "bronchialAsthma", "history")}
            />
          </View>
        </View>
        {/* Desc 3 */}
        <View style={styles.radioButtonDescBox}>
          <Text style={styles.radioButtonDesc}>
            Enfermedad pulmonar obstructiva crónica
          </Text>
          <View style={styles.radioButtonRow}>
            <RadioButton
              label="Sí"
              checked={userData.medicalHistory.obstructiveLungDisease}
              onPress={() =>
                handleFormChange(true, "obstructiveLungDisease", "history")
              }
            />
            <RadioButton
              label="No"
              checked={userData.medicalHistory.obstructiveLungDisease === false}
              onPress={() =>
                handleFormChange(false, "obstructiveLungDisease", "history")
              }
            />
          </View>
        </View>
        {/* Desc 8 */}
        <View style={styles.radioButtonDescBox}>
          <Text style={styles.radioButtonDesc}>
            Trastorno de circulación pulmonar
          </Text>
          <View style={styles.radioButtonRow}>
            <RadioButton
              label="Sí"
              checked={userData.medicalHistory.PulmonaryCirculationDisorder}
              onPress={() =>
                handleFormChange(
                  true,
                  "PulmonaryCirculationDisorder",
                  "history"
                )
              }
            />
            <RadioButton
              label="No"
              checked={
                userData.medicalHistory.PulmonaryCirculationDisorder === false
              }
              onPress={() =>
                handleFormChange(
                  false,
                  "PulmonaryCirculationDisorder",
                  "history"
                )
              }
            />
          </View>
        </View>
        {/* Desc 4 */}
        <View style={styles.radioButtonDescBox}>
          <Text style={styles.radioButtonDesc}>Depresión</Text>
          <View style={styles.radioButtonRow}>
            <RadioButton
              label="Sí"
              checked={userData.medicalHistory.depression}
              onPress={() => handleFormChange(true, "depression", "history")}
            />
            <RadioButton
              label="No"
              checked={userData.medicalHistory.depression === false}
              onPress={() => handleFormChange(false, "depression", "history")}
            />
          </View>
        </View>
        {/* Desc 5 */}
        <View style={styles.radioButtonDescBox}>
          <Text style={styles.radioButtonDesc}>Diabetes</Text>
          <View style={styles.radioButtonRow}>
            <RadioButton
              label="Sí"
              checked={userData.medicalHistory.diabetes}
              onPress={() => handleFormChange(true, "diabetes", "history")}
            />
            <RadioButton
              label="No"
              checked={userData.medicalHistory.diabetes === false}
              onPress={() => handleFormChange(false, "diabetes", "history")}
            />
          </View>
        </View>
        {/* Desc 6 */}
        <View style={styles.radioButtonDescBox}>
          <Text style={styles.radioButtonDesc}>Hipertensión arterial</Text>
          <View style={styles.radioButtonRow}>
            <RadioButton
              label="Sí"
              checked={userData.medicalHistory.arterialHypertension}
              onPress={() =>
                handleFormChange(true, "arterialHypertension", "history")}
            />
            <RadioButton
              label="No"
              checked={userData.medicalHistory.arterialHypertension === false}
              onPress={() =>
                handleFormChange(false, "arterialHypertension", "history")
              }
            />
          </View>
        </View>
        {/* Desc 7 */}
        <View style={styles.radioButtonDescBox}>
          <Text style={styles.radioButtonDesc}>Hipotiroidismo</Text>
          <View style={styles.radioButtonRow}>
            <RadioButton
              label="Sí"
              checked={userData.medicalHistory.hypothyroidism}
              onPress={() =>
                handleFormChange(true, "hypothyroidism", "history")
              }
            />
            <RadioButton
              label="No"
              checked={userData.medicalHistory.hypothyroidism === false}
              onPress={() =>
                handleFormChange(false, "hypothyroidism", "history")
              }
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

export default MedicalHistoryTwo;
