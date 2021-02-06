import React from "react";
import { useSelector } from "react-redux";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import { CommonActions } from "@react-navigation/native";
import globalStyles from "../styles";

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

const UpdateProfile = ({ navigation }) => {
  const userName = useSelector(userNameSelector);
  const userAge = useSelector(userAgeSelector);
  console.log(userName);
  return (
    <View style={[globalStyles.container, styles.container]}>
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
          <View>
            <Icon name="user-circle-o" size={70} color="white" />
            <Icon name="plus" size={15} color="white" style={styles.plusIcon} />
          </View>
          <View style={styles.headerInfoUserTextBox}>
            <Text style={styles.headerInfoUserText}>{userName}</Text>
            <Text style={styles.headerInfoUserText}>{`${userAge} Años`}</Text>
          </View>
        </View>
      </LinearGradient>
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
  headerInfoUser: {
    position: "relative",
    alignItems: "center",
  },
  plusIcon: {
    position: "absolute",
    backgroundColor: "#3867B4",
    width: 25,
    height: 25,
    padding: 5,
    borderRadius: 100,
    bottom: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  headerInfoUserTextBox: {
    marginTop: 10,
    textAlign: "center",
  },
  headerInfoUserText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default UpdateProfile;
