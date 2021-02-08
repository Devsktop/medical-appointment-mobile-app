import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import storage from "@react-native-firebase/storage";
import auth from "@react-native-firebase/auth";
import { launchImageLibrary } from "react-native-image-picker";
import firestore from "@react-native-firebase/firestore";

// Actions
import { loadingProfilePhoto } from "../redux/actions/utilsActions";
import { updateProfilePhotoUrl } from "../redux/actions/UserAction";

// Components
import ProfilePhoto from "./ProfilePhoto";

const UpdateProfilePhoto = () => {
  const dispatch = useDispatch();

  const uploadImageToStorage = async (path) => {
    dispatch(loadingProfilePhoto(true));
    const { currentUser } = auth();
    const imageName = `${currentUser.uid}_profilePhoto`;
    const reference = storage().ref(imageName);
    await reference.putFile(path);
    const url = await reference.getDownloadURL();
    await firestore().collection("users").doc(currentUser.uid).update({
      profilePhotoUrl: url,
    });
    dispatch(loadingProfilePhoto(false));
    dispatch(updateProfilePhotoUrl(url));
  };

  const chooseFile = () => {
    const options = {
      includeBase64: false,
      maxHeight: 240,
      maxWidth: 240,
      mediaType: "photo",
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker", storage());
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else if (response.width < 0) {
        Alert.alert("Solo se permiten formatos de imágenes.");
      } else uploadImageToStorage(response.uri);
    });
  };

  return (
    <TouchableWithoutFeedback onPress={chooseFile}>
      <View>
        <ProfilePhoto width={110} height={110} />
        <Icon name="plus" size={15} color="white" style={styles.plusIcon} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
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
  profileContainer: {
    borderRadius: 100,
    overflow: "hidden",
    borderStyle: "solid",
    borderColor: "white",
    borderWidth: 2,
  },
  profileButton: {
    width: 100,
    height: 100,
  },
  profilePhoto: {
    width: "100%",
    height: "100%",
  },
});

export default UpdateProfilePhoto;
