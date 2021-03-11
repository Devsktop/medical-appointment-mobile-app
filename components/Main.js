/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ActivityIndicator,
  Image,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import globalStyles from "../styles";

import Ambulance from '../assets/ambulance.svg';

// Actions
import { showMenu } from "../redux/actions/utilsActions";
import { getDoctorAppointments } from "../redux/actions/doctorsActions";

const banner = require("../assets/mainImg/female-GP-online.jpg");

const Main = ({ navigation }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      if (e.data.action.type !== "GO_BACK") navigation.dispatch(e.data.action);
      e.preventDefault();
    });
  }, [navigation]);

  const validateUser = async () => {
    const { currentUser } = auth();
    if (!currentUser) {
      navigation.navigate("SignUp");
    } else {
      const users = await firestore()
        .collection("users")
        .doc(currentUser.uid)
        .get();

      if (users.exists) {
        const { isNewUser } = users.data();
        if (isNewUser) {
          dispatch(showMenu(false));
          navigation.navigate("NewUserForm");
        } else {
          setLoading(false);
          dispatch(showMenu(true));
        }
      } else {
        const doctors = await firestore()
          .collection("doctors")
          .doc(currentUser.uid)
          .get();
        if (doctors.exists) {
          await new Promise((resolve) =>
            resolve(dispatch(getDoctorAppointments(currentUser.uid)))
          );
          navigation.navigate("DoctorAppointments");
        } else navigation.navigate("SignUp");
      }
    }
  };

  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      validateUser();
    });
    return focusListener;
  }, []);

  useEffect(() => {}, []);

  if (loading)
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#669df6" />
        <Text style={styles.loadingText}>Verificando usuario</Text>
      </View>
    );

  return (
    <View style={[globalStyles.container, styles.container]}>
      <View style={{flex: 1}}>
        <View style={banner}>
          <Image style={styles.bannerImage} source={banner} />
          <TouchableHighlight
            style={styles.bookAppointment}
            onPress={() => navigation.navigate("Clinics")}
            underlayColor="#3a6ab1"
          >
            <Text style={styles.logoutText}>Agendar Cita</Text>
          </TouchableHighlight>
        </View>
        <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
        <FontAwesome name="ambulance" size={100} style={{color:"gray", marginBottom: 20, opacity: .6}} />
        <Text style={{fontSize: 22, color: "gray", fontWeight: "bold", textAlign: "center"}}>
          Agenda tus consultas médicas de manera instantánea 
        </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 5,
    color: "gray",
    fontWeight: "bold",
    fontSize: 18,
  },
  bannerImage: {
    position: "relative",
    height: 200,
  },
  banner: {
    alignItems: "center",
    height: "30%",
    position: "absolute",
  },
  bookAppointment: {
    position: "absolute",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#1CC3E1",
    borderRadius: 10,
    width: "50%",
    marginTop: 180,
    marginLeft: 100,
    zIndex: 2,
  },
  body: {
    marginTop: 20,
  },
  logout: {
    marginVertical: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "blue",
    borderRadius: 10,
    width: "100%",
    height: 100,
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase"
  },
  background: {
    width: 500,
    height: 130,
    marginTop: 15,

    backgroundColor: "#69a2ff",
  },
});

export default Main;
