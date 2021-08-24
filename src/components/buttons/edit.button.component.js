import React from "react";
import { IconButton } from "react-native-paper";
import { StyleSheet, StatusBar } from "react-native";
import { theme } from "../../infrastructure/theme";

const ButtonSizeH = 40;
const ButtonSizeW = 40;

export const EditButton = (props) => {
  return (
    <IconButton
      icon={props.icon}
      onPress={props.onPress}
      style={styles.fav}
      theme={{
        colors: {
          primary: theme.colors.bg.primary || props.buttonColor,
          text: "white",
        },
      }}
    >
      {props.title}
    </IconButton>
  );
};

const styles = StyleSheet.create({
  fav: {
    position: "absolute",
    top: StatusBar.currentHeight / 50,
    right: StatusBar.currentHeight / 10,
    zIndex: 9,
    borderWidth: 2,
    backgroundColor: theme.colors.brand.primary,
    height: ButtonSizeH,
    width: ButtonSizeW,
    justifyContent: "center",
    borderColor: theme.colors.bg.primary,
    borderRadius: 20,
  },
});
