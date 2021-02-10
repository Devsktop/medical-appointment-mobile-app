import React from "react";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { CommonActions } from "@react-navigation/native";

const UpdateProfileHeader = ({ navigation }) => (
  <View style={styles.backButton}>
    <Icon
      name="arrowleft"
      size={35}
      color="white"
      onPress={() => navigation.dispatch(CommonActions.goBack())}
      style={styles.icon}
    />
  </View>
);

const styles = StyleSheet.create({
  backButton: {
    marginBottom: 20,
  },
});

export default UpdateProfileHeader;
