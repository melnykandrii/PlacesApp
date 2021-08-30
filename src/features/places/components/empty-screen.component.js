import React from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import {
  EmptyIcon,
  EmptyContainer,
  EmptyLabel,
} from "../styles/empty-screen.styles";

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
