import React, { useState, useEffect } from "react";
import { Text, View, TouchableHighlight, StyleSheet } from "react-native";
import auth from "@react-native-firebase/auth";

const NewUserForm = ({ navigation }) => {
  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      console.log(navigation);
      if (e.data.action.type !== "GO_BACK") navigation.dispatch(e.data.action);
      e.preventDefault();
    });
  }, [navigation]);

  const logout = () => {
    auth().signOut();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>Hola new user</Text>
      </View>
      <View>
        <TouchableHighlight
          style={styles.logout}
          onPress={() => navigation.navigate("Main")}
        >
          <Text style={styles.logoutText}>Prube navigation</Text>
        </TouchableHighlight>
      </View>
      <View>
        <TouchableHighlight style={styles.logout} onPress={logout}>
          <Text style={styles.logoutText}>Inicia sesión con otra cuenta</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    height: "90%",
    justifyContent: "center",
  },
  logout: {
    marginVertical: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "blue",
    borderRadius: 10,
    width: "100%",
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default NewUserForm;
