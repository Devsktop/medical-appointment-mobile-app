import React from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import auth from "@react-native-firebase/auth";

const userNameSelector = (state) => {
  const { names, lastNames } = state.user.userData;
  const firstName = names.split(" ")[0];
  const firstLastName = lastNames.split(" ")[0];

  return `${firstName} ${firstLastName}`;
};

const userAgeSelector = (state) => {
  const { bornDate } = state.user.userData;
  const yearDiff = Date.now() - bornDate.getTime();
  const ageDate = new Date(yearDiff);

  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const userGenderSelector = (state) => {
  const { gender } = state.user.userData;
  return gender === "male" ? "Masculino" : "Femenino";
};

const ProfileHeader = ({ textBoxStyle }) => {
  if (!auth().currentUser) {
    return null;
  }
  const userName = useSelector(userNameSelector);
  const userAge = useSelector(userAgeSelector);
  const gender = useSelector(userGenderSelector);

  return (
    <View style={textBoxStyle}>
      <Text style={styles.headerInfoUserText}>{userName}</Text>
      <Text style={styles.headerInfoUserText}>{`${userAge} Años`}</Text>
      <Text style={styles.headerInfoUserText}>{gender}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerInfoUserText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileHeader;
