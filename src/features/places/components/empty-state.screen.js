import React from "react";
import { Text } from "../../../components/typography/text.component";
import { BodyButton } from "../../../components/buttons/body.buttons";
import styled from "styled-components";
import { EmptyIcon } from "../styles/empty-screen.styles";
import { Spacer } from "../../../components/spacer/spacer.component";

const EmptyContainer = styled.View`
  flex: 9;
  padding: 5px;
  align-items: center;
  justify-content: center;
`;

const EmptyLabel = styled(Text)`
  align-self: center;
`;

export const EmptyStateScreen = (props) => {
  return (
    <EmptyContainer>
      <EmptyIcon {...props} icon={props.icon} />
      <Spacer position="top" size="xxl" />
      <EmptyLabel variant="bodyTitle">{props.label}</EmptyLabel>
      <EmptyLabel variant="hint">{null || props.description}</EmptyLabel>
      <BodyButton {...props} />
    </EmptyContainer>
  );
};
