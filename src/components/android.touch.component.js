import React from "react";
import { TouchableNativeFeedback, View, StyleSheet } from "react-native";

export const AndroidTouch = ({ children }) => {
  return (
    <View style={styles.outsideView}>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("#AAF", true)}
      >
        <View style={styles.insideView}>{children}</View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  outsideView: {
    borderRadius: 10,
    backgroundColor: "transparent",
    width: "60%",
    height: "60%",
  },
  insideView: {
    borderRadius: 20,
    backgroundColor: "transparent",
    width: "100%",
    height: "100%",
  },
});
