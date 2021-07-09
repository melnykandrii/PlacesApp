import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { StatusBar, StyleSheet, SafeAreaView } from "react-native";
import { RoboStackNavigator } from "./src/infrastracture/navigation/robo.stack.navigation";

export default function App() {
  return (
    <NavigationContainer>
      <>
        <SafeAreaView style={styles.container}>
          <RoboStackNavigator />
        </SafeAreaView>
        <ExpoStatusBar style="auto" />
      </>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});
