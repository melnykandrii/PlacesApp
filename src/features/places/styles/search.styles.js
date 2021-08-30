import { Searchbar } from "react-native-paper";
import styled from "styled-components";

export const Search = styled(Searchbar)`
  padding: 5px;
  margin-top: 2px;
  width: 98%;
  align-self: center;
  height: 100%;
`;
/*
export const Search = styled(Searchbar)`
  position: absolute;
  z-index: 999;
  top: ${(props) => props.theme.space[2]};
  width: 98%;
  left: ${(props) => props.theme.space[2]};
`;
*/
