import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import SearchBar from "./SearchBar";

// Actions
import { doctorsFilter } from "../redux/actions/doctorsActions";

const DoctorsSearchBar = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.doctors.doctorsFilter);

  return (
    <SearchBar
      placeholder="Buscar por nombre..."
      onChangeText={(value) => dispatch(doctorsFilter(value))}
      value={filter}
    />
  );
};

export default DoctorsSearchBar;
