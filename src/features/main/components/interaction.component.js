import React from "react";
import {
  ItemContainer,
  IconContainer,
  DataContainer,
} from "../styles/robot-modal.styles";
import { ModalIcon } from "../../../components/icons/icon.modal.component";
import { Text } from "../../../components/typography/text.component";

export const InteractionComponent = (props) => {
  return (
    <ItemContainer>
      <IconContainer>
        <ModalIcon {...props} />
      </IconContainer>

      <DataContainer>
        <Text {...props}>{props.char}</Text>
      </DataContainer>
    </ItemContainer>
  );
};
