import React from "react";
import { Search } from "../styles/search.styles";

export const SearchBar = ({ filter, onFilter }) => {
  return (
    <Search
      value={filter}
      placeholder="Search for Robots"
      onChangeText={onFilter}
    />
  );
};
