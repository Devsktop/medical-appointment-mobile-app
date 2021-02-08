import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import LinearGradient from "react-native-linear-gradient";

// Components
import ProfilePhoto from "./ProfilePhoto";
import UserNameAge from "./UserNameAge";
import BackButton from "./BackButton";

const ProfileHeader = ({ navigation }) => (
  <LinearGradient style={styles.header} colors={["#3867B4", "#0F94B4"]}>
    <BackButton navigation={navigation} />
    <View style={styles.headerInfo}>
      <View style={styles.headerInfoUser}>
        <ProfilePhoto width={70} height={70} />
        <UserNameAge
          textBoxStyle={{
            justifyContent: "center",
            marginLeft: 10,
          }}
        />
      </View>
      <TouchableHighlight
        style={styles.updateProfileButton}
        onPress={() => navigation.navigate("UpdateProfile")}
      >
        <Text style={styles.updateProfileButtonText}>Editar perfil</Text>
      </TouchableHighlight>
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
    alignItems: "center",
  },
  headerInfoUser: {
    flexDirection: "row",
  },
  headerInfoUserTextBox: {
    justifyContent: "center",
    marginLeft: 10,
  },
  headerInfoUserText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  updateProfileButton: {
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#ACFAC7",
  },
  updateProfileButtonText: {
    color: "#356AB4",
    fontSize: 15,
  },
});

export default ProfileHeader;
