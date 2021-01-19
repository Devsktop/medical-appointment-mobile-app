import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 8,
  },
  lightButton: {
    backgroundColor: "white",
  },
  lightButtonText: {
    color: "#3b65a3",
  },
  darkButton: {
    backgroundColor: "#3b65a3",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  screenTitle: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 26,
    marginTop: 20,
  },
  inputBox: {
    borderRadius: 8,
    backgroundColor: "rgba(5,43,43,.1)",
    padding: 15,
    marginVertical: 5,
  },
  inputField: {
    borderBottomColor: "#35d7e7",
    borderStyle: "solid",
    borderBottomWidth: 2,
    color: "white",
    padding: 5,
    paddingBottom: 0,
  },
});
