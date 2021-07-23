import React from "react";
import {
  TitleContainer,
  StyledImage,
  CardContainer,
  ImageContainer,
} from "../styles/account-card.styles";
import { Text } from "../../../components/typography/text.component";

export const AccountItem = ({ robot }) => {
  return (
    <CardContainer>
      <ImageContainer>
        <StyledImage
          source={{ uri: `https://robohash.org/name+${robot.id}` }}
        />
      </ImageContainer>
      <TitleContainer>
        <Text variant="header">{robot.name}</Text>
        <Text variant="body">{robot.email}</Text>
      </TitleContainer>
    </CardContainer>
  );
};
