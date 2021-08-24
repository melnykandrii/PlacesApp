import React from "react";

import styled from "styled-components/native";
import { Platform } from "react-native";
import { WebView } from "react-native-webview";
import { Text } from "../../../components/typography/text.component";

const CompactImage = styled.Image`
  border-radius: ${(props) => props.theme.sizepx[5]};
  width: ${(props) => props.theme.sizepx[6]};
  height: ${(props) => props.theme.sizepx[6]};
`;

const CompactWebView = styled(WebView)`
  border-radius: ${(props) => props.theme.sizepx[5]};
  width: ${(props) => props.theme.sizepx[6]};
  height: ${(props) => props.theme.sizepx[6]};
`;

const Item = styled.View`
  align-items: center;
`;

const isAndroid = Platform.OS === "android";

export const PlaceCompactInfo = ({ place }) => {
  const Image = isAndroid ? CompactWebView : CompactImage;
  return (
    <Item>
      <Text variant="body" numberOfLines={3}>
        {place.title}
      </Text>
      <Image source={{ uri: place.imageUri }} />
    </Item>
  );
};
