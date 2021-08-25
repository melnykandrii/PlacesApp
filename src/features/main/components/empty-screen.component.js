import React from "react";
import { Dimensions } from "react-native";
import { Text } from "../../../components/typography/text.component";
import styled from "styled-components";

const deviceWidth = Dimensions.get("window").width / 3.5;
const deviceHeight = Dimensions.get("window").height / 3;

const EmptyContainer = styled.View`
  position: absolute;
  top: ${deviceHeight}px;
  right: ${deviceWidth}px;
  z-index: 999;
`;

const EmptyLabel = styled(Text)`
  align-self: center;
`;

export const EmptyScreen = (props) => {
  return (
    <EmptyContainer>
      <EmptyLabel variant="bodyTitle">{props.label}</EmptyLabel>
    </EmptyContainer>
  );
};
