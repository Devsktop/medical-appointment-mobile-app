import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Text, View, TouchableHighlight, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import globalStyles from "../../styles";

// Actions
import { showMenu } from "../../redux/actions/utilsActions";

const Success = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      if (e.data.action.type !== "GO_BACK") navigation.dispatch(e.data.action);
      e.preventDefault();
    });
  }, [navigation]);

  return (
    <LinearGradient
      style={[globalStyles.container, styles.container]}
      colors={["#3867B4", "#0F94B4"]}
    >
      <Text style={globalStyles.screenTitle}>
        ¡Registro completado exitosamente!
      </Text>
      <View style={styles.icon}>
        <Icon name="check-circle" size={200} color="#4CEC79" />
        <Text style={styles.iconText}>
          Presione Aceptar para empezar a utilizar la aplicación
        </Text>
      </View>
      <TouchableHighlight
        underlayColor="#2985b3"
        style={[globalStyles.button, globalStyles.lightButton]}
        onPress={() => {
          navigation.navigate("Main");
          dispatch(showMenu(true));
        }}
      >
        <Text style={[globalStyles.buttonText, globalStyles.lightButtonText]}>
          Aceptar
        </Text>
      </TouchableHighlight>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
  },
  icon: {
    alignItems: "center",
  },
  iconText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
    fontSize: 18,
  },
});

export default Success;
