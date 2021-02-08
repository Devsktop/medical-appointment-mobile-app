import React from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";
import { CommonActions } from "@react-navigation/native";
import ProfilePhoto from "./ProfilePhoto";

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

const ProfileHeader = ({ navigation }) => {
  const userName = useSelector(userNameSelector);
  const userAge = useSelector(userAgeSelector);

  const handleGoBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };
  return (
    <LinearGradient style={styles.header} colors={["#3867B4", "#0F94B4"]}>
      <View style={styles.backButton}>
        <Icon
          name="arrow-left"
          size={25}
          color="white"
          onPress={handleGoBack}
        />
      </View>
      <View style={styles.headerInfo}>
        <View style={styles.headerInfoUser}>
          <ProfilePhoto width={70} height={70} />
          <View style={styles.headerInfoUserTextBox}>
            <Text style={styles.headerInfoUserText}>{userName}</Text>
            <Text style={styles.headerInfoUserText}>{`${userAge} Años`}</Text>
          </View>
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
