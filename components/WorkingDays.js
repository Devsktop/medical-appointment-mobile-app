import React from "react";
import { Text, View, StyleSheet } from "react-native";

const WorkingDays = ({ workingDays }) => (
  <View>
    <Text
      style={{
        color: "#408cc2",
        fontSize: 18,
        textTransform: "uppercase",
        margin: 20,
      }}
    >
      Días laborales
    </Text>
    <View
      style={{ flexDirection: "row", backgroundColor: "#fafafa", padding: 20 }}
    >
      <Text style={workingDays.includes(0) ? styles.work : styles.free}>
        {"DO - "}
      </Text>
      <Text style={workingDays.includes(1) ? styles.work : styles.free}>
        {"LU - "}
      </Text>
      <Text style={workingDays.includes(2) ? styles.work : styles.free}>
        {"MA - "}
      </Text>
      <Text style={workingDays.includes(3) ? styles.work : styles.free}>
        {"MI - "}
      </Text>
      <Text style={workingDays.includes(4) ? styles.work : styles.free}>
        {"JU - "}
      </Text>
      <Text style={workingDays.includes(5) ? styles.work : styles.free}>
        {"VI - "}
      </Text>
      <Text style={workingDays.includes(6) ? styles.work : styles.free}>
        SÁ
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  work: {
    fontWeight: "bold",
    color: "#408cc2",
    fontSize: 17,
  },
  free: {
    color: "gray",
    fontSize: 17,
  },
});

export default WorkingDays;
