import React from "react";
import { Dimensions } from "react-native";
import { Text } from "../../../components/typography/text.component";
import styled from "styled-components";
import { Avatar } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";

const deviceWidth = Dimensions.get("window").width / 4.5;
const deviceHeight = Dimensions.get("window").height / 3;

const EmptyIcon = styled(Avatar.Icon).attrs({
  size: 60,
})`
  background: ${(props) => props.bg || props.theme.colors.brand.primary};
  align-self: center;
`;

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
      <EmptyIcon {...props} icon={props.icon} />
      <Spacer position="top" size="xxl">
        <EmptyLabel variant="bodyTitle">{props.label}</EmptyLabel>
        <EmptyLabel variant="hint">{props.description}</EmptyLabel>
      </Spacer>
    </EmptyContainer>
  );
};
