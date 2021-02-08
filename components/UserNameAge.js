import React from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";

const userNameSelector = (state) => {
  const { names, lastNames } = state.user.userData;
  const firstName = names.split(" ")[0];
  const firstLastName = lastNames.split(" ")[0];

  return `${firstName} ${firstLastName}`;
};

const userAgeSelector = (state) => {
  const { bornDate } = state.user.userData;

  const yearDiff = Date.now() - bornDate.toDate().getTime();
  const ageDate = new Date(yearDiff);

  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const ProfileHeader = ({ textBoxStyle }) => {
  const userName = useSelector(userNameSelector);
  const userAge = useSelector(userAgeSelector);

  return (
    <View style={textBoxStyle}>
      <Text style={styles.headerInfoUserText}>{userName}</Text>
      <Text style={styles.headerInfoUserText}>{`${userAge} Años`}</Text>
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
