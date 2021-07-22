import React from "react";
import { View, Text, Button } from "react-native";

export const PlacesScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Places Screen</Text>
      <Button title="Details" onPress={() => navigation.navigate("Details")} />
    </View>
  );
};
