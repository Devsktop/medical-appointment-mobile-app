import React from "react";
import { Text, View, StyleSheet } from "react-native";
import globalStyles from "../../styles";

import RadioButton from "../RadioButton";

const MedicalHistoryOne = ({ userData, handleFormChange }) => (
  <View>
    <Text style={styles.bloodTypeTitle}>Antecedentes médicos</Text>
    <View style={globalStyles.inputBox}>
      <View style={styles.radioButtonContainer}>
        {/* Desc 1 */}
        <View style={styles.radioButtonDescBox}>
          <Text style={styles.radioButtonDesc}>VIH/SIDA</Text>
          <View style={styles.radioButtonRow}>
            <RadioButton
              label="Sí"
              checked={userData.medicalHistory.vih}
              onPress={() => handleFormChange(true, "vih", "history")}
            />
            <RadioButton
              label="No"
              checked={userData.medicalHistory.vih === false}
              onPress={() => handleFormChange(false, "vih", "history")}
            />
          </View>
        </View>
        {/* Desc 2 */}
        <View style={styles.radioButtonDescBox}>
          <Text style={styles.radioButtonDesc}>Obesidad</Text>
          <View style={styles.radioButtonRow}>
            <RadioButton
              label="Sí"
              checked={userData.medicalHistory.obesity}
              onPress={() => handleFormChange(true, "obesity", "history")}
            />
            <RadioButton
              label="No"
              checked={userData.medicalHistory.obesity === false}
              onPress={() => handleFormChange(false, "obesity", "history")}
            />
          </View>
        </View>
        {/* Desc 3 */}
        <View style={styles.radioButtonDescBox}>
          <Text style={styles.radioButtonDesc}>Anemia</Text>
          <View style={styles.radioButtonRow}>
            <RadioButton
              label="Sí"
              checked={userData.medicalHistory.anemia}
              onPress={() => handleFormChange(true, "anemia", "history")}
            />
            <RadioButton
              label="No"
              checked={userData.medicalHistory.anemia === false}
              onPress={() => handleFormChange(false, "anemia", "history")}
            />
          </View>
        </View>
        {/* Desc 4 */}
        <View style={styles.radioButtonDescBox}>
          <Text style={styles.radioButtonDesc}>
            Trastornos hermorrágicos o coagulopatías
          </Text>
          <View style={styles.radioButtonRow}>
            <RadioButton
              label="Sí"
              checked={userData.medicalHistory.bleedingDisorders}
              onPress={() =>
                handleFormChange(true, "bleedingDisorders", "history")}
            />
            <RadioButton
              label="No"
              checked={userData.medicalHistory.bleedingDisorders === false}
              onPress={() =>
                handleFormChange(false, "bleedingDisorders", "history")
              }
            />
          </View>
        </View>
        {/* Desc 5 */}
        <View style={styles.radioButtonDescBox}>
          <Text style={styles.radioButtonDesc}>
            Enfermedad vascular periférica
          </Text>
          <View style={styles.radioButtonRow}>
            <RadioButton
              label="Sí"
              checked={userData.medicalHistory.peripheralVascularDisease}
              onPress={() =>
                handleFormChange(true, "peripheralVascularDisease", "history")}
            />
            <RadioButton
              label="No"
              checked={
                userData.medicalHistory.peripheralVascularDisease === false
              }
              onPress={() =>
                handleFormChange(false, "peripheralVascularDisease", "history")
              }
            />
          </View>
        </View>
        {/* Desc 6 */}
        <View style={styles.radioButtonDescBox}>
          <Text style={styles.radioButtonDesc}>Artritis reumatoidea</Text>
          <View style={styles.radioButtonRow}>
            <RadioButton
              label="Sí"
              checked={userData.medicalHistory.rheumatoidArthritis}
              onPress={() =>
                handleFormChange(true, "rheumatoidArthritis", "history")}
            />
            <RadioButton
              label="No"
              checked={userData.medicalHistory.rheumatoidArthritis === false}
              onPress={() =>
                handleFormChange(false, "rheumatoidArthritis", "history")
              }
            />
          </View>
        </View>
        {/* Desc 7 */}
        <View style={styles.radioButtonDescBox}>
          <Text style={styles.radioButtonDesc}>Isuficiencia cardíaca</Text>
          <View style={styles.radioButtonRow}>
            <RadioButton
              label="Sí"
              checked={userData.medicalHistory.heartFailure}
              onPress={() => handleFormChange(true, "heartFailure", "history")}
            />
            <RadioButton
              label="No"
              checked={userData.medicalHistory.heartFailure === false}
              onPress={() => handleFormChange(false, "heartFailure", "history")}
            />
          </View>
        </View>
        {/* Desc 8 */}
        <View style={styles.radioButtonDescBox}>
          <Text style={styles.radioButtonDesc}>Insuficiencia renal</Text>
          <View style={styles.radioButtonRow}>
            <RadioButton
              label="Sí"
              checked={userData.medicalHistory.renalFailure}
              onPress={() => handleFormChange(true, "renalFailure", "history")}
            />
            <RadioButton
              label="No"
              checked={userData.medicalHistory.renalFailure === false}
              onPress={() => handleFormChange(false, "renalFailure", "history")}
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

export default MedicalHistoryOne;
