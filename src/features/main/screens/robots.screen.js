import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { RobotList } from "../components/robots-list.component";

export const RobotsScreen = ({ navigation }) => {
  return (
    <>
      <View style={styles.searchContainer}>
        <Text>Hi</Text>
      </View>

      <View style={styles.listContainer}>
        <RobotList />
      </View>
      <View>
        <Button
          title="Next Screen"
          onPress={() => navigation.navigate("Test")}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: "red",
    flex: 1,
  },
  listContainer: {
    flex: 9,
  },
});
