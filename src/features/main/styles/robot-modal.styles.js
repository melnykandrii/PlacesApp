import styled from "styled-components";
import { Modal } from "react-native-paper";

import { theme } from "../../../infrastructure/theme";

export const ModalContainer = styled(Modal).attrs({
  contentContainerStyle: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.brand.aqua,
    borderRadius: 20,
  },
})`
  padding: ${(props) => props.theme.space[6]};
`;

export const TopContainer = styled.View`
  flex: 0.7;
  align-items: flex-end;
  justify-content: center;
`;

export const ImageContainer = styled.View`
  flex: 5;
  justify-content: center;
  align-items: center;
`;

export const ModalImage = styled.Image`
  height: 100%;
  width: 100%;
`;

export const TitleContainer = styled.View`
  flex: 1.3;
  align-items: center;
  justify-content: space-evenly;
`;
export const DetailsContainer = styled.View`
  flex: 2.2;
  justify-content: space-around;
`;

export const RowContainer = styled.View`
  flex-direction: row;
  align-content: center;
`;

export const ItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 2;
`;

export const IconContainer = styled.View`
  flex: 2;
`;

export const DataContainer = styled.View`
  flex: 4;
  align-items: flex-start;
  padding-left: ${(props) => props.theme.space[3]};
`;

export const ButtonContainer = styled.View`
  flex: 0.8;
`;
