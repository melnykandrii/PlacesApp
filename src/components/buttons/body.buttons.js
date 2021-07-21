import React from "react";
import { Button } from "react-native-paper";
import styled from "styled-components";
import { theme } from "../../infrastructure/theme";

const StyledBButton = styled(Button)`
  margin-horizontal: 30%;
`;

export const BodyButton = (props) => {
  return (
    <StyledBButton
      {...props}
      onPress={props.onNavi}
      color={props.color || theme.colors.brand.aqua}
      mode={props.mode}
    >
      {props.title}
    </StyledBButton>
  );
};
