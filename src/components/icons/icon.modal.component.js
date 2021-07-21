import React from "react";
import { Icon } from "react-native-elements";

export const ModalIcon = (props) => {
  return (
    <Icon
      {...props}
      name={props.name}
      type={props.type}
      color={props.color}
      size={props.size}
      onPress={props.onPress}
    />
  );
};
