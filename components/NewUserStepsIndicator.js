import React from "react";
import { View, StyleSheet } from "react-native";

const NewUserStepsIndicator = ({ cant = 6, current }) => {
  const indicators = [];

  for (let i = 0; i <= cant; i++) {
    indicators.push(
      <View
        style={[styles.indicator, i === current ? styles.indicatorActive : ""]}
      />
    );
  }
  return <View style={styles.container}>{indicators}</View>;
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    flexDirection: "row",
    justifyContent: "center",
  },
  indicator: {
    borderRadius: 100,
    width: 15,
    height: 15,
    backgroundColor: "rgba(255,255,255, .4)",
    marginHorizontal: 3,
  },
  indicatorActive: {
    backgroundColor: "#fff",
  },
});

export default NewUserStepsIndicator;
