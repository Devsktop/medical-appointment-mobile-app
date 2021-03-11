import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import globalStyles from "../styles";

// Components
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";

const Profile = ({ navigation }) => {
  const isValid = useSelector((state) => state.user.userData);
  if (!isValid) return null;
  return (
    <View style={[globalStyles.container, styles.container]}>
      <ProfileHeader navigation={navigation} />
      <ProfileBody />
    </View>
  );
};

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
  headerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerInfoUser: {
    flexDirection: "row",
  },
  headerInfoUserTextBox: {
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

export default Profile;
