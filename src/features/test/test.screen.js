import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const TestScreen = () => {
  return (
    <View style={styles.container}>
      <Text>This is Test screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
