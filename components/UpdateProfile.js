import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableHighlight,
} from "react-native";
import globalStyles from "../styles";

// Components
import UpdateProfileHeader from "./UpdateProfileHeader";

// Actions
import { showMenu } from "../redux/actions/utilsActions";

const UpdateProfile = ({ navigation }) => {
  const dispatch = useDispatch();
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
      <View style={styles.updateButton}>
        <TouchableHighlight
          underlayColor="#2985b3"
          style={[globalStyles.button, globalStyles.darkButton]}
          onPress={() => {
            dispatch(showMenu(false));
            navigation.navigate("UpdateUserForm");
          }}
        >
          <Text style={[globalStyles.buttonText]}>
            Actualizar información general
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    position: "relative",
    flex: 1,
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
  updateButton: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 30,
  },
});

export default UpdateProfile;
