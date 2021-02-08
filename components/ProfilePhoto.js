import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const ProfilePhoto = ({ width, height }) => {
  const profilePhotoUrl = useSelector((state) => state.user.profilePhotoUrl);

  return (
    <View style={[styles.container, styles.profileButton, { width, height }]}>
      {profilePhotoUrl ? (
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: profilePhotoUrl }}
            progressiveRenderingEnabled
            style={styles.profilePhoto}
          />
        </View>
      ) : (
        <Icon name="user-circle-o" size={100} color="white" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
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

export default ProfilePhoto;
