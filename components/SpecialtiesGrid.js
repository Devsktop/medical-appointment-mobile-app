import React from "react";
import { useSelector } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";

const specialtiesSelector = (state) => {
  const { specialtiesFilter, specialties } = state.doctors;
  const filter = {};
  Object.keys(specialties).forEach((key) => {
    if (
      specialties[key].specialty
        .toLowerCase()
        .indexOf(specialtiesFilter.toLowerCase()) > -1
    )
      filter[key] = { ...specialties[key] };
  });
  return filter;
};

const Specialties = () => {
  const specialties = useSelector(specialtiesSelector);
  return (
    <ScrollView>
      <View style={styles.container}>
        {Object.keys(specialties).map((key) => (
          <View key={key} style={[styles.specialty]}>
            <ImageBackground
              source={{ uri: specialties[key].imageUrl }}
              style={{
                width: "100%",
                height: 130,
                justifyContent: "flex-end",
              }}
            >
              <Text style={styles.specialtyText}>
                {specialties[key].specialty}
              </Text>
            </ImageBackground>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  specialty: {
    width: "48%",
    height: 120,
    marginVertical: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  specialtyText: {
    paddingVertical: 5,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: "rgba(0,0,0,.5)",
    marginRight: 20,
    marginBottom: 3,
    borderTopRightRadius: 10,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Specialties;
