import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";

const UpdateProfile = () => (
  <View>
    <LinearGradient>
      <View>
        <Icon name="user-circle-o" size={25} color="white" />
        <Icon name="plus" size={25} color="white" />
      </View>
    </LinearGradient>
  </View>
);

export default UpdateProfile;
