import React, { useState } from "react";
import { Text, View, StyleSheet, Slider } from "react-native";

export const DetailsScreen = ({ route }) => {
  const { item } = route.params;

  return (
    <View>
      <Text>{item.title}</Text>
      <Text>{item.id}</Text>
    </View>
  );
};
