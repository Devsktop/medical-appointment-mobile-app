/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const Main = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      console.log(navigation);
      if (e.data.action.type !== "GO_BACK") navigation.dispatch(e.data.action);
      e.preventDefault();
    });
  }, [navigation]);

  useEffect(() => {
    console.log("renderizé main");
    const focusListener = navigation.addListener("focus", () => {
      validateUser();
    });
    return focusListener;
  }, []);

  const logout = () => {
    auth().signOut();
  };

  const validateUser = () => {
    const { currentUser } = auth();
    console.log(currentUser);
    if (!currentUser) {
      navigation.navigate("LoginController");
    } else {
      console.log(currentUser.uid);
      firestore()
        .collection("users")
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const { isNewUser } = doc.data();
            if (isNewUser) {
              console.log("i am new user");
              navigation.navigate("NewUserForm");
              setLoading(false);
            } else {
              setUser(currentUser);
              setLoading(false);
            }
          }
        });
    }
  };

  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );

  return (
    <View style={styles.container}>
      <Text>
        Hi
        {user && user.email}
      </Text>
      <View>
        <TouchableHighlight onPress={logout} style={styles.logout}>
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
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
    padding: 10,
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

export default Main;
