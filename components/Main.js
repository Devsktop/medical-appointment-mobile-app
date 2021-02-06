/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ActivityIndicator,
  Image,
  FlatList,
  ScrollView,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const banner = require("../assets/mainImg/female-GP-online.jpg");
const background = require("../assets/mainImg/fondo.jpg");

const Main = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([
    { id: 1, specialty: "Gastroenterología", doctor: "José Jiménez" },
    { id: 2, specialty: "Gastroenterología", doctor: "Alguien Más" },
    { id: 3, specialty: "Gastroenterología", doctor: "Alguien Más" },
  ]);
  const Banner = ({ item }) => (
    <View>
      <ImageBackground source={background} style={styles.background}>
        <View style={styles.Appointment}>
          <Text style={styles.appointmentText}>
            {`Especialidad: ${item.specialty}`}
          </Text>
          <Text style={styles.appointmentText}>
            Médico:
            {item.doctor}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );

  const validateUser = () => {
    const { currentUser } = auth();
    if (!currentUser) {
      navigation.navigate("SignUp");
    } else {
      firestore()
        .collection("users")
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const { isNewUser } = doc.data();
            if (isNewUser) navigation.navigate("NewUserForm");
            else {
              setUser(currentUser);
              setLoading(false);
            }
          }
        });
    }
  };

  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      validateUser();
    });
    return focusListener;
  }, []);

  const logout = () => {
    auth().signOut();
  };

  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={banner}>
          <Image style={styles.bannerImage} source={banner} />
          <TouchableHighlight style={styles.bookAppointment}>
            <Text style={styles.logoutText}>Agendar una Cita</Text>
          </TouchableHighlight>
        </View>
        <View>
          <FlatList
            data={appointments}
            renderItem={({ item }) => <Banner item={item} />}
          />
        </View>

        <View>
          <TouchableHighlight onPress={logout} style={styles.logout}>
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerIcons}>
          <TouchableHighlight>
            <Icon
              name="home"
              size={30}
              color="#4F8EF7"
              style={{ marginLeft: 30 }}
            />
          </TouchableHighlight>
          <Icon name="medkit-outline" size={30} color="gray" />
          <Icon name="calendar" size={30} color="gray" />
          <Icon
            name="ios-person"
            size={30}
            color="gray"
            style={{ marginRight: 20 }}
            onPress={() => navigation.navigate("Profile")}
          />
        </View>

        <View style={styles.footerText}>
          <Text style={{ marginLeft: 30 }}>Inicio </Text>
          <Text style={{ marginRight: 10, marginLeft: 10 }}>
            Especialidades
          </Text>
          <Text style={{ marginRight: 20 }}>Citas </Text>
          <Text style={{ marginRight: 5 }}>Mi Perfil </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
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
  footer: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 80,
    marginTop: 10,
    borderColor: "white",
    borderWidth: 10,
  },
  footerIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  Appointment: {
    marginTop: 15,
  },
  background: {
    width: 500,
    height: 150,
    marginTop: 15,
  },
  appointmentText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default Main;
