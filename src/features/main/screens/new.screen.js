import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableNativeFeedback,
  StatusBar,
  Button,
} from "react-native";
import { AndroidTouch } from "../../../components/android.touch.component";

export const NewScreen = () => {
  return (
    <View style={styles.container}>
      <AndroidTouch>
        <Text style={styles.text}>New</Text>
      </AndroidTouch>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  touchable: { flex: 0.5, borderColor: "black", borderWidth: 1 },
  text: { alignSelf: "center" },
});
