import React from "react";
import { View, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import { CommonActions } from "@react-navigation/native";

// Components
import UpdateProfilePhoto from "./UpdateProfilePhoto";
import UserNameAge from "./UserNameAge";

const UpdateProfileHeader = ({ navigation }) => (
  <LinearGradient style={styles.header} colors={["#3867B4", "#0F94B4"]}>
    <View style={styles.backButton}>
      <Icon
        name="arrow-left"
        size={25}
        color="white"
        onPress={() => navigation.dispatch(CommonActions.goBack())}
      />
    </View>
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
  backButton: {
    marginBottom: 20,
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
