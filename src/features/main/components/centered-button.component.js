import React from "react";
import { Dimensions } from "react-native";
import { Button } from "react-native-paper";
import styled from "styled-components";
import { theme } from "../../../infrastructure/theme";

const ButtonSizeH = 50;
const ButtonSizeW = 120;
const deviceWidth = Dimensions.get("window").width / 2 - ButtonSizeW / 2;
const deviceHeight = Dimensions.get("window").height / 1.2;

const StyledButton = styled(Button)`
  position: absolute;
  top: ${deviceHeight}px;
  right: ${deviceWidth}px;
  z-index: 999;
  border-width: ${(props) => props.theme.space[2]};
  height: ${ButtonSizeH}px;
  width: ${ButtonSizeW}px;
  justify-content: center;
  border-color: ${(props) => props.theme.colors.bg.primary};
  border-radius: ${(props) => props.theme.sizepx[1]};
  background-color: ${(props) => props.theme.colors.brand.primary};
`;

export const MainButton = (props) => {
  return (
    <StyledButton
      {...props}
      icon={props.icon}
      onPress={props.onNavi}
      color={props.color || theme.colors.bg.primary}
      mode={props.mode}
    >
      {props.title}
    </StyledButton>
  );
};
