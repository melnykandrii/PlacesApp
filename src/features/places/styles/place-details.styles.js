import styled from "styled-components";
import { Text } from "../../../components/typography/text.component";

export const FormContainer = styled.View`
  margin: ${(props) => props.theme.sizepx[4]};
`;

export const Header = styled(Text)`
  align-self: center;
  padding-bottom: ${(props) => props.theme.space[7]};
  padding-top: ${(props) => props.theme.space[6]};
`;

export const Address = styled(Text)`
  padding-top: ${(props) => props.theme.space[6]};
  padding-bottom: ${(props) => props.theme.space[5]};
`;

export const ImageContainer = styled.View`
  margin-bottom: ${(props) => props.theme.sizepx[1]};
  width: 100%;
  height: ${(props) => props.theme.sizepx[14]};
  border-color: ${(props) => props.theme.colors.text.grey};
  border-width: ${(props) => props.theme.space[1]};
  justify-content: center;
  align-items: center;
`;

export const ImagePreview = styled.Image`
  width: 100%;
  height: 100%;
`;
