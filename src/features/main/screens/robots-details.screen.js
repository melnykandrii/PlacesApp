import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";

export const RobotsDetailsScreen = ({ route }) => {
  const { itemId, item } = route.params;
  console.log(item);
  return (
    <View>
      <View>
        <Image
          style={styles.bgImage}
          source={{ uri: `https://robohash.org/name+${itemId}` }}
        />
      </View>
      <View>
        <Text>Name:{Object.values(item.name)}</Text>
        <Text>UserName:{Object.values(item.username)}</Text>
        <Text>E-mail:{Object.values(item.email)}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  bgImage: {
    width: "80%",
    height: "80%",
    alignSelf: "center",
  },
});
