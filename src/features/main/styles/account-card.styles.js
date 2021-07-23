import styled from "styled-components";

export const TitleContainer = styled.View`
  flex: 4;
  background-color: ${(props) => props.theme.colors.ui.bg};
  padding: ${(props) => props.theme.space[3]};
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: ${(props) => props.theme.sizepx[1]};
  border-bottom-right-radius: ${(props) => props.theme.sizepx[1]};
`;

export const CardContainer = styled.View`
  height: 300px;
  margin: 10px;
  width: 60%;
  align-self: center;
  background-color: ${(props) => props.theme.colors.brand.aqua};
  border-radius: 10px;
  overflow: hidden;
  elevation: 5;
`;

export const ImageContainer = styled.View``;
export const StyledImage = styled.Image`
  width: 80%;
  height: 80%;
  align-self: center;
`;
