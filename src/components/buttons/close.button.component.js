import React from "react";
import { IconButton } from "react-native-paper";
import { theme } from "../../infrastructure/theme";

export const CloseButton = ({ props, onClose, name }) => {
  return (
    <IconButton
      {...props}
      icon={name}
      color={theme.colors.text.primary}
      onPress={onClose}
    />
  );
};
