import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Image,
} from "react-native";

// const specialtieImg = require("../assets/logo.png");

const Specialties = () => {
  const [searchBar, setSearchBar] = useState("");
  const [specialtieOption, setSpecialtieOption] = useState([
    (id: 1),
    (specialtie: "Ginecología"),
    (img: ""),
  ]);

  return (
    <>
      <View>
        <Text>Especialidades</Text>
      </View>

      <View>
        <TextInput
          autoCapitalize="none"
          placeholder="Buscar especialidad"
          onChangeText={(pattern) => setSearchBar(pattern)}
          value={searchBar}
        />
      </View>

      <View>
        <TouchableHighlight OnPress="">
          {/* <Image source={specialtieImg} /> */}
          <Text>Ginecología</Text>
        </TouchableHighlight>
      </View>
    </>
  );
};

export default Specialties;
