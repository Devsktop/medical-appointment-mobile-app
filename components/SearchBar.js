import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { TextInput, View, StyleSheet } from "react-native";

const SearchBar = ({ onChange, value, placeholder }) => (
  <View style={styles.background}>
    <View style={styles.container}>
      <Icon name="search" size={20} style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  background: {
    padding: 6,
    backgroundColor: "#d6d6d6",
    paddingHorizontal: 10,
  },
  container: {
    position: "relative",
    borderRadius: 5,
    overflow: "hidden",
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 10,

    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    width: "10%",
    color: "#d6d6d6",
  },
  input: {
    width: "90%",
    height: "100%",
    padding: 5,
  },
});

export default SearchBar;
