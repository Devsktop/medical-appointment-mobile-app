import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import * as RootNavigation from "../RootNavigation";

const NavBar = () => {
  const [current, setCurrent] = useState("Main");

  useEffect(() => {
    const routeNames = ["Main", "Profile"];
    const router = RootNavigation.navigationRef.current.addListener(
      "state",
      () => {
        const currentRoute = RootNavigation.navigationRef.current.getCurrentRoute()
          .name;
        if (routeNames.includes(currentRoute)) setCurrent(currentRoute);
      }
    );

    return router;
  }, [RootNavigation.navigationRef]);

  const navController = (button) => {
    setCurrent(button);
    RootNavigation.navigate(button);
  };
  return (
    <View style={styles.navbar}>
      <View style={styles.navbarButton}>
        <Icon
          style={styles.navbarButtonIcon}
          size={30}
          color={current === "Main" ? "#3a6ab1" : "gray"}
          name="home"
          onPress={() => navController("Main")}
        />
        <Text style={styles.navbarButtonText}>Inicio</Text>
      </View>
      <View style={styles.navbarButton}>
        <Icon
          style={styles.navbarButtonIcon}
          size={30}
          color={current === "Specialties" ? "#3a6ab1" : "gray"}
          name="medkit-outline"
        />
        <Text style={styles.navbarButtonText}>Especialidades</Text>
      </View>
      <View style={styles.navbarButton}>
        <Icon
          style={styles.navbarButtonIcon}
          size={30}
          color={current === "Dates" ? "#3a6ab1" : "gray"}
          name="calendar"
        />
        <Text style={styles.navbarButtonText}>Citas</Text>
      </View>
      <View style={styles.navbarButton}>
        <Icon
          style={styles.navbarButtonIcon}
          size={30}
          color={current === "Profile" ? "#3a6ab1" : "gray"}
          name="ios-person"
          onPress={() => navController("Profile")}
        />
        <Text style={styles.navbarButtonText}>Mi perfil</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
    backgroundColor: "#fff",
  },
  navbarButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  navbarButtonText: {
    textAlign: "center",
    color: "gray",
  },
});

export default NavBar;
