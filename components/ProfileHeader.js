import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import auth from "@react-native-firebase/auth";

// Components
import ProfilePhoto from "./ProfilePhoto";
import UserNameAge from "./UserNameAge";
import BackButton from "./BackButton";

// Actions

const ProfileHeader = ({ navigation }) => (
  <LinearGradient style={styles.header} colors={["#3867B4", "#0F94B4"]}>
    <BackButton navigation={navigation} />
    <View style={styles.headerInfo}>
      <View style={styles.headerInfoUser}>
        <ProfilePhoto width={80} height={80} />
        <UserNameAge
          textBoxStyle={{
            justifyContent: "flex-start",
            marginLeft: 10,
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          style={styles.updateProfileButton}
          onPress={() => navigation.navigate("UpdateProfile")}
          underlayColor="#769ad0"
        >
          <Text style={styles.updateProfileButtonText}>Editar perfil</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.logoutButton}
          onPress={() => auth().signOut()}
          underlayColor="#bf6b6b"
        >
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableHighlight>
      </View>
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  header: {
    padding: 15,
  },
  headerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerInfoUser: {
    flexDirection: "row",
  },
  headerInfoUserTextBox: {
    justifyContent: "flex-start",
    marginLeft: 10,
  },
  headerInfoUserText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    justifyContent: "flex-start",
  },
  updateProfileButton: {
    borderRadius: 4,
    padding: 8,
    marginVertical: 5,
    backgroundColor: "#3864a6",
  },
  updateProfileButtonText: {
    color: "white",
    textTransform: "uppercase",
    fontSize: 11,
    textAlign: "center",
  },
  logoutButton: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: "#a63838",
  },
  logoutButtonText: {
    color: "white",
    textTransform: "uppercase",
    fontSize: 11,
    textAlign: "center",
  },
});

export default ProfileHeader;
