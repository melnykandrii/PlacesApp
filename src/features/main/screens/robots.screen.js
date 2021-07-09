import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { RobotList } from "../components/robots-list.component";
import { SearchBar } from "../components/search-bar.component";
import { robots } from "../../../services/first/robots";

export const RobotsScreen = ({ navigation }) => {
  const [filter, setFilter] = useState("");

  const onFilterChange = (text) => {
    setFilter(text);
  };

  const filterRobot = robots.filter((robot) => {
    return robot.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase());
  });

  return (
    <>
      <View style={styles.searchContainer}>
        <SearchBar onFilter={onFilterChange} filter={filter} />
      </View>

      <View style={styles.listContainer}>
        <RobotList robots={filterRobot} />
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
    flex: 1,
  },
  listContainer: {
    padding: 5,
    flex: 9,
  },
});
