import styled from "styled-components";

export const ImageBack = styled.Image`
  margin-top: ${(props) => props.theme.space[3]};
  width: 58%;
  height: 80%;
  align-self: center;
  background-color: ${(props) => props.theme.colors.brand.aqua};
  border-radius: ${(props) => props.theme.sizepx[12]};
  border-width: ${(props) => props.theme.space[1]};
  border-color: ${(props) => props.theme.colors.bg.primary};
`;

export const TitleContainer = styled.View`
  flex: 1;
  align-items: center;
  padding-top: ${(props) => props.theme.space[3]};
`;
export const BottomContainer = styled.View`
  padding-left: ${(props) => props.theme.space[4]};
  padding-right: ${(props) => props.theme.space[4]};
  padding-top: ${(props) => props.theme.space[2]};
`;
