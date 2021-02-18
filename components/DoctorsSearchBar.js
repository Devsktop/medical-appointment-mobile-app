import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import SearchBar from "./SearchBar";

// Actions
import { specialtiesFilter } from "../redux/actions/doctorsActions";

const DoctorsSearchBar = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.doctors.specialtiesFilter);

  return (
    <SearchBar
      placeholder="Buscar especialidad..."
      onChangeText={(value) => dispatch(specialtiesFilter(value))}
      value={filter}
    />
  );
};

export default DoctorsSearchBar;
