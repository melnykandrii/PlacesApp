import React from "react";
import { FlatList } from "react-native";
import { robots } from "../../../services/first/robots";
import { RobotItem } from "./robots-card.component";

export const RobotList = () => {
  const renderRobot = ({ item }) => (
    <RobotItem id={item.id} name={item.name} email={item.email} />
  );

  return (
    <FlatList
      data={robots}
      renderItem={renderRobot}
      keyExtractor={(item) => item.id.toString()}
      horizontal={false}
    />
  );
};
