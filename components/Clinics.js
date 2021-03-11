import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";

// Components
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import BackButton from "./BackButton";
import HospitalIcon from "../assets/hospital.svg";

// Actions
import { selectClinic } from "../redux/actions/doctorsActions";

const clinicsSelector = (state) => {
  const { clinics } = state.doctors;
  const clinicsWithId = [];
  if (!clinics) return null;
  Object.keys(clinics).forEach((key) => {
    clinicsWithId.push({ ...clinics[key], idClinic: key });
  });
  return clinicsWithId;
};

const Clinics = ({ navigation }) => {
  const clinics = useSelector(clinicsSelector);
  if (!clinics) return null; 
  return (
    <View>
      <LinearGradient
        style={styles.headerContainer}
        colors={["#3867B4", "#0F94B4"]}
      >
        <View style={styles.header}>
          <BackButton navigation={navigation} />
          <Text style={styles.title}>Clínicas disponibles</Text>
        </View>
      </LinearGradient>
      {clinics && (
        <View
          style={{
            width: "100%",
          }}
        >
          <FlatList
            data={clinics}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <Banner item={item} index={index} navigation={navigation} />
            )}
          />
        </View>
      )}
    </View>
  );
};

export default Clinics;

const Banner = ({ item, index, navigation }) => {
  const dispatch = useDispatch();
  const handleOnpress = () => {
    dispatch(selectClinic(item.idClinic));
    console.log(item.idClinic);
    navigation.navigate("Specialties");
  };
  return (
    <View
      style={{
        width: "100%",
        height: 130,
        backgroundColor: index % 2 === 0 ? "#e6e6e6" : "#dbdbdb",
      }}
    >
      <TouchableWithoutFeedback onPress={handleOnpress}>
        <View style={styles.Appointment}>
          <HospitalIcon width={50} height={50} />
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={styles.clinicName}>{`${item.name}`}</Text>
            <Text style={styles.clinicMap}>{item.direction}</Text>
            <Text style={styles.clinicMap}>{item.phone}</Text>
          </View>
          <View style={{}}>
            <TouchableHighlight>
              <Icon
                name="chevron-forward-circle-outline"
                size={30}
                style={{}}
                color="#013e7a"
              />
            </TouchableHighlight>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  Appointment: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
  background: {
    width: "100%",
    height: 130,

    backgroundColor: "#69a2ff",
  },
  clinicMap: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
    color: "#000",
    maxWidth: 200,
  },
  clinicName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#3d62ad",
    textAlign: "center",
    marginBottom: 3,
    textTransform: "uppercase"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
    marginLeft: 20,
    fontSize: 20,
  },
  headerContainer: {
    padding: 20,
    paddingBottom: 0,
    paddingTop: 40,
  },
});
