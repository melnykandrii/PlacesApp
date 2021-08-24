import React from "react";
import { ActivityIndicator } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { theme } from "../../../infrastructure/theme";

export const PreviewLoadingState = (props) => {
  return (
    <>
      <ActivityIndicator size="large" color={theme.colors.brand.primary} />
      <Text variant="load">{props.label}</Text>
    </>
  );
};
