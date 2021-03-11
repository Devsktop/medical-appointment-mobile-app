import React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";

const RadioButton = ({ checked, onPress, label, direction = "row" }) => (
  <View style={direction === "row" ? styles.boxRow : styles.boxColumn}>
    <TouchableOpacity style={styles.circle} onPress={onPress}>
      {checked ? <View style={styles.checkedCircle} /> : <View />}
    </TouchableOpacity>
    <Text style={styles.label}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  circle: {
    height: 25,
    width: 25,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center", // To center the checked circle…
    justifyContent: "center",
    marginRight: 10,
  },
  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#fff", // You can set it default or with yours one…
  },
  label: {
    color: "#fff",
    fontWeight: "bold",
  },
  boxRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "50%",
  },
  boxColumn: {
    flexDirection: "column",
  },
});

export default RadioButton;
