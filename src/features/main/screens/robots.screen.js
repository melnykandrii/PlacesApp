import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { SearchBar } from "../components/search-bar.component";
import { RobotItem } from "../components/robots-card.component";
import { robots } from "../../../services/first/robots";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

export const RobotsScreen = ({ navigation }) => {
  const [filter, setFilter] = useState("");

  const onFilterChange = (text) => {
    setFilter(text);
  };

  const filteredRobot = robots.filter((robot) => {
    return robot.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase());
  });

  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version === 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
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
              onPress={() =>
                navigation.navigate("RobotDetails", {
                  itemId: item.id,
                  item: item,
                })
              }
            >
              <RobotItem robot={item} />
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
});
