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
  FlatList,
  ScrollView,
  ImageBackground,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import globalStyles from "../styles";

// Actions
import { showMenu } from "../redux/actions/utilsActions";

const banner = require("../assets/mainImg/female-GP-online.jpg");
const background = require("../assets/mainImg/fondo.jpg");

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

const Main = ({ navigation }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      if (e.data.action.type !== "GO_BACK") navigation.dispatch(e.data.action);
      e.preventDefault();
    });
  }, [navigation]);

  const [appointments, setAppointments] = useState([
    { id: 1, specialty: "Gastroenterología", doctor: "José Jiménez" },
    { id: 2, specialty: "Gastroenterología", doctor: "Alguien Más" },
    { id: 3, specialty: "Gastroenterología", doctor: "Alguien Más" },
  ]);

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
            if (isNewUser) {
              dispatch(showMenu(false));
              navigation.navigate("NewUserForm");
            } else {
              setUser(currentUser);
              setLoading(false);
              dispatch(showMenu(true));
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

  if (loading)
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#669df6" />
        <Text style={styles.loadingText}>Verificando usuario</Text>
      </View>
    );

  return (
    <View style={[globalStyles.container, styles.container]}>
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
            keyExtractor={(appointment) => appointment.id.toString()}
          />
        </View>
      </ScrollView>
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
