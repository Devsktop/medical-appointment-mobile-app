import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import auth from "@react-native-firebase/auth";
import globalStyles from "../styles";

const medicalHistoryConst = {
  vih: "VIH",
  obesity: "Obesidad",
  anemia: "Anemia",
  bleedingDisorders: "Trastornos hemorrágicos",
  peripheralVascularDisease: "Enfermedad arterial periférica",
  rheumatoidArthritis: "Artritis reumatoide",
  heartFailure: "Insuficiencia cardiaca",
  renalFailure: "Insuficiencia Renal",
  coronaryDisease: "Enfermedad coronaria",
  bronchialAsthma: "Asma bronquial",
  obstructiveLungDisease: "Enfermedad pulmonar obstructiva crónica",
  PulmonaryCirculationDisorder: "Trastorno de circulación pulmonar",
  depression: "Depresión",
  diabetes: "Diabetes",
  arterialHypertension: "Hipertensión arterial",
  hypothyroidism: "Hipotiroidismo",
  liverDisease: "Enfermedad hepática",
  lymphoma: "Linfoma",
  neurologicalDisorders: "Trastornos neurológicos",
  cancer: "Cáncer",
  paralysis: "Parálisis",
  smoker: "Fumador",
  alcoholic: "Abuso de alcohol",
  drugAddict: "Abuso de drogas",
  gestationState: "En estado de gestación",
  nursing: "Lactando",
  disability: "Discapacidad",
};

const ProfileMedicalHistory = () => {
  if (!auth().currentUser) {
    return null;
  }
  const medicalHistory = useSelector(
    (state) => state.user.userData.medicalHistory
  );

  return (
    <View style={[globalStyles.container]}>
      <Text style={styles.title}>Antecedentes médicos</Text>
      <ScrollView>
        {Object.keys(medicalHistory).map((key) => (
          <Text key={key} style={styles.history}>
            {`${medicalHistoryConst[key]}:    `}
            <Text>
              {medicalHistory[key] ? (
                <Text style={{ fontWeight: "bold" }}>Sí</Text>
              ) : (
                <Text style={{ fontWeight: "bold" }}>No</Text>
              )}
            </Text>
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "#429cea",
    marginBottom: 20,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  history: {
    marginVertical: 10,
    color: "gray",
    textTransform: "uppercase",
  },
});

export default ProfileMedicalHistory;
