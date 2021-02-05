import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import globalStyles from "../styles";

const Profile = () => (
  <View style={globalStyles.container}>
    <View style={styles.header}>
      <View style={styles.backButton}>Volver</View>
      <View style={styles.headerInfo}>
        <View style={styles.headerInfoUser}>
          <Icon name="user-circle" color="#262626" size={50} />
          <View style={styles.headerInfoUserText}>
            <Text>Jhoseph Guerrero</Text>
            <Text>21 Años</Text>
          </View>
        </View>
        <TouchableHighlight style={styles.updateProfileButton}>
          <Text>Editar perfil</Text>
        </TouchableHighlight>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({});

export default Profile;
