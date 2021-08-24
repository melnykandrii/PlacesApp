import styled from "styled-components";

export const FormContainer = styled.View`
  margin-bottom: ${(props) => props.theme.sizepx[4]};
`;

export const PreviewContainer = styled.TouchableOpacity`
  margin-bottom: ${(props) => props.theme.sizepx[1]};
  width: 100%;
  height: ${(props) => props.theme.sizepx[12]};
  border-color: ${(props) => props.theme.colors.text.grey};
  border-width: ${(props) => props.theme.space[1]};
  justify-content: center;
  align-items: center;
`;

export const ImageMap = styled.Image`
  width: 100%;
  height: 100%;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;
