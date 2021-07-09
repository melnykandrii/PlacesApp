import React from "react";
import { Searchbar } from "react-native-paper";
import styled from "styled-components";

const Search = styled(Searchbar)`
  padding: 5px;
  margin-top: 2px;
  width: 98%;
  align-self: center;
  height: 100%;
`;

export const SearchBar = ({ filter, onFilter }) => {
  console.log(filter);
  return (
    <Search
      value={filter}
      placeholder="Search for Robots"
      onChangeText={onFilter}
    />
  );
};
