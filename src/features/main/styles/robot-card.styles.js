import { Card } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";
import styled from "styled-components";

export const CardView = styled(Card)`
  background-color: ${(props) => props.theme.colors.brand.aqua};
  margin-bottom: ${(props) => props.theme.space[4]};
  border-radius: 20px;
  height: 300px;
  width: 200px;
  align-self: center;
`;

export const CardCover = styled(Card.Cover)`
  border-radius: ${(props) => props.theme.sizepx[4]};
  background-color: ${(props) => props.theme.colors.brand.aqua};
  height: 75%;
  width: 80%;
  align-self: center;
`;

export const CardTitle = styled(Text)`
  padding-top: ${(props) => props.theme.sizepx[4]};
  align-self: center;
  justify-content: space-between;
`;

export const CardDescription = styled(Text)`
  align-self: center;
`;
