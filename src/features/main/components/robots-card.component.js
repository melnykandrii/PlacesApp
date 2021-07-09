import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  StyleSheet,
} from "react-native";

export const RobotItem = ({ id, name, email }) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version === 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <TouchableCmp onPress={null}>
      <View style={styles.robotItem}>
        <View styel={styles.imageContainer}>
          <Image
            style={styles.bgImage}
            source={{ uri: `https://robohash.org/${id}` }}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{name}</Text>
          <Text>{email}</Text>
        </View>
      </View>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  robotItem: {
    height: 300,
    margin: 20,
    width: "60%",
    alignSelf: "center",
    backgroundColor: "#20B2AA",
    borderRadius: 10,
    overflow:
      Platform.OS === "android" && Platform.Version >= 21
        ? "visible"
        : "visible",
    elevation: 5,
  },
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
