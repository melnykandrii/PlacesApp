import styled from "styled-components";
import { Text } from "../../../components/typography/text.component";

export const FormContainer = styled.View`
  margin: ${(props) => props.theme.sizepx[4]};
`;

export const Title = styled(Text)`
  margin-top: ${(props) => props.theme.sizepx[0]};
  padding-bottom: ${(props) => props.theme.sizepx[0]};
`;

export const Header = styled(Text)`
  align-self: center;
`;

export const TitleInput = styled.TextInput`
  border-bottom-color: ${(props) => props.theme.colors.text.primary};
  border-bottom-width: ${(props) => props.theme.space[1]};
  margin-bottom: ${(props) => props.theme.space[6]};
  padding-vertical: ${(props) => props.theme.space[4]};
  padding-horizontal: ${(props) => props.theme.space[2]};
`;
