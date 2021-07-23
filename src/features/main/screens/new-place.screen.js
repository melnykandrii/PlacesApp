import React from "react";
import { View, Text, Button } from "react-native";

export const NewPlaceScreen = ({ navigation }) => {
  return (
    <View>
      <Text>New Places Screen</Text>
      <Button title="Map" onPress={() => navigation.navigate("Map")} />
    </View>
  );
};
