import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, ScrollView, Text } from "react-native";

// Components
import SpecialtyBox from "./SpecialtyBox";

const specialtiesSelector = (state) => {
  const {
    specialtiesFilter,
    specialties,
    doctors,
    currentClinic,
  } = state.doctors;

  if (!doctors) return null;

  const specialtiesBySearch = getSpecialtiesBySearch(
    specialties,
    specialtiesFilter
  );

  const doctorsByClinic = getDoctorsByClinic(doctors, currentClinic);

  if (!doctorsByClinic) return null;

  return filterSpecialties(doctorsByClinic, specialtiesBySearch);
};

const getSpecialtiesBySearch = (specialties, specialtiesFilter) => {
  const specialtiesBySearch = {};
  Object.keys(specialties).forEach((key) => {
    if (
      specialties[key].specialty
        .toLowerCase()
        .indexOf(specialtiesFilter.toLowerCase()) > -1
    )
      specialtiesBySearch[key] = { ...specialties[key] };
  });
  return specialtiesBySearch;
};

const getDoctorsByClinic = (doctors, currentClinic) => {
  const doctorsByClinic = {};

  Object.keys(doctors).forEach((key) => {
    if (doctors[key].idClinic === currentClinic)
      doctorsByClinic[key] = { ...doctors[key] };
  });
  return doctorsByClinic;
};

const filterSpecialties = (doctors, specialties) => {
  const filteredSpecialties = {};
  Object.keys(doctors).forEach((doctorId) => {
    if (specialties[doctors[doctorId].specialty]) {
      filteredSpecialties[doctors[doctorId].specialty] = {
        ...specialties[doctors[doctorId].specialty],
      };
    }
  });

  return filteredSpecialties;
};

const Specialties = () => {
  const specialties = useSelector(specialtiesSelector);

  return (
    <ScrollView>
      {Object.keys(specialties).length > 0 ? (
        <View style={styles.container}>
          {Object.keys(specialties).map((key) => {
            return (
              <SpecialtyBox key={key} specialties={specialties[key]} id={key} />
            );
          })}
        </View>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center", height: 490, padding: 20 }}
        >
          <Text style={{fontSize: 18, color: "gray", fontWeight: "bold", textAlign: "center"}} >No se han registrado médicos para esta clínica.</Text>
        </View>
      )}
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
