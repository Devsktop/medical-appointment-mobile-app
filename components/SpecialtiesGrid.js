import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, ScrollView } from "react-native";

// Components
import SpecialtyBox from "./SpecialtyBox";

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
          <SpecialtyBox key={key} specialties={specialties[key]} id={key} />
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
});

export default Specialties;
