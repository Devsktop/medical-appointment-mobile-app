// import React, { useState } from "react";
// import { StyleSheet, Text, TextInput, View, FlatList } from "react-native";

// // Components
// import SpecialtieBox from "./SpecialtieBox";

// const Specialties = () => {
//   const [searchBar, setSearchBar] = useState("");
//   const [specialtieOptions, setSpecialtieOptions] = useState([
//     { id: 1, specialtie: "Ginecología", specialtieImage: "" },
//     { id: 2, specialtie: "Cardiología", specialtieImage: "" },
//   ]);

//   return (
//     <>
//       <View>
//         <Text>Especialidades</Text>
//       </View>

//       <View>
//         <TextInput
//           autoCapitalize="none"
//           placeholder="Buscar especialidad"
//           onChangeText={(pattern) => setSearchBar(pattern)}
//           value={searchBar}
//         />
//       </View>
//       <FlatList>
//         {Object.keys(specialtieOptions).map((specialtieOptionKey) => (
//           <SpecialtieBox
//             key={specialtieOptionKey}
//             specialty={specialtieOptionKey.specialtie}
//             img={specialtieOptionKey.specialtieImage}
//           />
//         ))}
//       </FlatList>
//     </>
//   );
// };

// const styles = StyleSheet.create({});

// export default Specialties;
