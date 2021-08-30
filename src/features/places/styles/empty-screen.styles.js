import { Dimensions } from "react-native";
import { Text } from "../../../components/typography/text.component";
import styled from "styled-components";
import { Avatar } from "react-native-paper";

const deviceWidth = Dimensions.get("window").width / 4.5;
const deviceHeight = Dimensions.get("window").height / 3;

export const EmptyIcon = styled(Avatar.Icon).attrs({
  size: 60,
})`
  background: ${(props) => props.bg || props.theme.colors.brand.primary};
  align-self: center;
`;

export const EmptyContainer = styled.View`
  position: absolute;
  top: ${deviceHeight}px;
  right: ${deviceWidth}px;
  z-index: 999;
`;

export const EmptyLabel = styled(Text)`
  align-self: center;
`;
