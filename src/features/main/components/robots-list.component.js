import React from "react";
import { FlatList } from "react-native";
import { RobotItem } from "./robots-card.component";

export const RobotList = ({ robots }) => {
  const renderRobot = ({ item }) => (
    <RobotItem id={item.id} name={item.name} email={item.email} />
  );

  return (
    <FlatList
      data={robots}
      renderItem={renderRobot}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};
