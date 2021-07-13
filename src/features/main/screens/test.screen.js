import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { SearchBar } from "../components/search-bar.component";
import { robots } from "../../../services/first/robots";
import {
  Text,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

export const TestScreen = ({ navigation }) => {
  let TouchableCmp = TouchableNativeFeedback;
  if (Platform.OS === "ios") {
    TouchableCmp = TouchableOpacity;
  }
  const [filter, setFilter] = useState("");

  const onFilterChange = (text) => {
    setFilter(text);
  };

  const filteredRobot = robots.filter((robot) => {
    return robot.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase());
  });

  return (
    <>
      <View style={styles.searchContainer}>
        <SearchBar onFilter={onFilterChange} filter={filter} />
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={filteredRobot}
          renderItem={({ item }) => (
            <TouchableCmp
              useForeground
              onPress={() =>
                navigation.navigate("TestDetails", {
                  itemId: item.id,
                  item: item,
                })
              }
              background={TouchableNativeFeedback.Ripple("#AAF", true)}
            >
              <View style={styles.robotItem}>
                <View styel={styles.imageContainer}>
                  <Image
                    style={styles.bgImage}
                    source={{ uri: `https://robohash.org/name+${item.id}` }}
                  />
                </View>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text>{item.email}</Text>
                </View>
              </View>
            </TouchableCmp>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
  },
  listContainer: {
    padding: 5,
    flex: 9,
  },
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
