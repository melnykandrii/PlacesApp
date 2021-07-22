import React from "react";
import { View, Text, Button } from "react-native";

export const DetailsScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Details Screen</Text>
      <Button title="Map" onPress={() => navigation.navigate("Map")} />
    </View>
  );
};
