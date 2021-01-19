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
  ]);
  const Banner = ({ item }) => {
    return (
      <View>
        <ImageBackground source={background} style={styles.background}>
          <View style={styles.Appointment}>
            <Text style={styles.appointmentText}>
              Especialidad: {item.specialty}
            </Text>
            <Text style={styles.appointmentText}>Médico: {item.doctor}</Text>
          </View>
        </ImageBackground>
      </View>
    );
  };

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
      <View style={banner}>
        <Image style={styles.bannerImage} source={banner} />
        <TouchableHighlight style={styles.bookAppointment}>
          <Text style={styles.logoutText}>Agendar una Cita</Text>
        </TouchableHighlight>
      </View>
      <ScrollView style={styles.body}>
        <FlatList
          data={appointments}
          renderItem={({ item }) => <Banner item={item} />}
          keyExtractor={(appointments) => appointments.id}
        />

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
          />
        </View>
        <View style={styles.footerText}>
          <Text style={{ marginLeft: 30 }}>Inicio </Text>
          <Text style={{ marginRight: 10, marginLeft: 10 }}>
            Especialidades{" "}
          </Text>
          <Text style={{ marginRight: 20 }}>Citas </Text>
          <Text style={{ marginRight: 5 }}>Mi Perfil </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

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
    flex: 1,
  },
  bookAppointment: {
    position: "absolute",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#1CC3E1",
    borderRadius: 10,
    width: "50%",
    marginTop: 180,
    marginLeft: 150,
  },
  body: {
    marginTop: 20,
    flex: 1,
  },
  footer: {
    backgroundColor: "white",
    position: "absolute",
    marginTop: "130%",
    flex: 1,
    height: 80,
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
