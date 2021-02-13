import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, Text } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import auth from "@react-native-firebase/auth";
import globalStyles from "../styles";

// components
import ProfileMedicalHistory from "./ProfileMedicalHistory";

const userDataSelector = (state) => {
  const {
    weight,
    height,
    bloodType,
    medicalHistory: { disability },
  } = state.user.userData;
  return { weight, height, bloodType, disability };
};

const Profile = () => {
  if (!auth().currentUser) {
    return null;
  }
  const { weight, height, bloodType, disability } = useSelector(
    userDataSelector
  );
  return (
    <View style={[globalStyles.container]}>
      <View style={styles.row}>
        <View style={styles.dataBox}>
          <FontAwesome
            style={styles.icon}
            name="wheelchair"
            size={30}
            color="#429cea"
          />
          <View style={styles.textBox}>
            <Text style={[styles.text, styles.textBold]}>
              {disability ? "Discapacitado" : "Ninguna"}
            </Text>
            <Text style={styles.text}>Discapacidad</Text>
          </View>
        </View>
        <View style={styles.dataBox}>
          <Fontisto
            style={styles.icon}
            name="blood-drop"
            size={30}
            color="#429cea"
          />
          <View style={styles.textBox}>
            <Text style={[styles.text, styles.textBold]}>
              {bloodType === "unknown" ? "Desconocido" : bloodType}
            </Text>
            <Text style={styles.text}>Tipo de sangre</Text>
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.dataBox}>
          <MaterialIcons
            style={styles.icon}
            name="human-male-height"
            size={30}
            color="#429cea"
          />
          <View style={styles.textBox}>
            <Text style={[styles.text, styles.textBold]}>{`${height} Cm`}</Text>
            <Text style={styles.text}>Altura</Text>
          </View>
        </View>
        <View style={styles.dataBox}>
          <FontAwesome
            style={styles.icon}
            name="weight"
            size={30}
            color="#429cea"
          />
          <View style={styles.textBox}>
            <Text style={[styles.text, styles.textBold]}>{`${weight} kg`}</Text>
            <Text style={styles.text}>Peso</Text>
          </View>
        </View>
      </View>
      <ProfileMedicalHistory />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 20,
  },
  dataBox: {
    flexDirection: "row",
    alignItems: "center",
    width: "48%",
  },
  icon: {
    width: "22%",
  },
  textBox: {
    width: "78%",
    marginLeft: 10,
  },
  text: {
    color: "gray",
    fontSize: 15,
  },
  textBold: {
    fontWeight: "bold",
  },
});

export default Profile;
