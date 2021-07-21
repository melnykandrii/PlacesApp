import React from "react";
import styled from "styled-components";
import { Text } from "../../../components/typography/text.component";
import { ActivityIndicator } from "react-native-paper";
import { theme } from "../../../infrastructure/theme";

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const LoadingIcon = (props) => {
  return <ActivityIndicator color={props.color || theme.colors.brand.aqua} />;
};

export const LoadingTitle = styled(Text)`
  color: ${(props) => props.colorTitle || props.theme.colors.brand.aqua};
`;
