import React from "react";
import { View, Text, Image, Platform, StyleSheet } from "react-native";
import { Card } from "react-native-paper";

export const TestItem = ({ robot }) => {
  return (
    <View style={styles.robotItem}>
      <View styel={styles.imageContainer}>
        <Image
          style={styles.bgImage}
          source={{ uri: `https://robohash.org/name+${robot.id}` }}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{robot.name}</Text>
        <Text>{robot.email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  robotItem: {
    height: 300,
    margin: 10,
    width: "60%",
    alignSelf: "center",
    backgroundColor: "#20B2AA",
    borderRadius: 10,
    overflow:
      Platform.OS === "android" && Platform.Version >= 21
        ? "visible"
        : "hidden",
    elevation: 5,
  },
  imageContainer: {},
  bgImage: {
    width: "80%",
    height: "80%",
    alignSelf: "center",
  },
  titleContainer: {
    flex: 4,
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    color: "black",
    textAlign: "center",
  },
});
