import React from "react";
import { View, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

// Components
import UpdateProfilePhoto from "./UpdateProfilePhoto";
import UserNameAge from "./UserNameAge";
import BackButton from "./BackButton";

const UpdateProfileHeader = ({ navigation }) => (
  <LinearGradient style={styles.header} colors={["#3867B4", "#0F94B4"]}>
    <BackButton navigation={navigation} />
    <View style={styles.headerInfoUser}>
      <UpdateProfilePhoto />
      <UserNameAge
        textBoxStyle={{
          marginTop: 10,
          alignItems: "center",
        }}
      />
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
  headerInfoUser: {
    alignItems: "center",
  },
  headerInfoUserText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default UpdateProfileHeader;
