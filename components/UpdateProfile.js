import React from "react";
import { useSelector } from "react-redux";

import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import globalStyles from "../styles";

import UpdateProfileHeader from "./UpdateProfileHeader";

const UpdateProfile = ({ navigation }) => {
  const isLoadingProfilePhoto = useSelector(
    (state) => state.utils.isLoadingProfilePhoto
  );
  return (
    <View style={[globalStyles.container, styles.container]}>
      {isLoadingProfilePhoto && (
        <View style={styles.loadingConatiner}>
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="white" />
            <Text style={styles.loadingText}>Cargando imagen</Text>
          </View>
        </View>
      )}
      <UpdateProfileHeader navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    position: "relative",
  },
  loadingConatiner: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 100,
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 15,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default UpdateProfile;
