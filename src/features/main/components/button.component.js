import styled from "styled-components";
import React from "react";
import {
  StyleSheet,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const LogoShadow = styled.View`
  },`;

export const AddButton = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <TouchableCmp
      {...props}
      onPress={props.onHelp}
      useForeground
      style={props.style}
    >
      <LogoShadow style={styles.imageView}>
        <AntDesign name="plus" size={40} />
      </LogoShadow>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  imageView: {
    height: 46,
    width: 46,
    borderRadius: 45,
    overflow:
      Platform.OS === "android" && Platform.Version >= 21
        ? "hidden"
        : "visible",
    elevation: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
  },
  image: {
    width: 46,
    height: 46,
    borderRadius: 45,
    justifyContent: "center",
  },
});
