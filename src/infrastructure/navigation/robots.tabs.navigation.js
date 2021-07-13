import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { RobotsTestScreen } from "../../features/main/screens/robot.test.screen";
import { RobotsStackNavigator } from "./robots.stack.navigation";
import { TestStackNavigator } from "./test.stack.navigator";
import { NewStackNavigator } from "./new.stack.navigation";

const RobotsTab = createBottomTabNavigator();

export const RobotsTabNavigator = () => {
  return (
    <RobotsTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Robots") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Test") {
            iconName = focused ? "ios-map" : "ios-map-outline";
          } else if (route.name === "Test2") {
            iconName = focused ? "heart" : "heart-outline";
          }
          return (
            <Icon name={iconName} type="ionicon" size={size} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: "red",
        inactiveTintColor: "gray",
        keyboardHidesTabBar: true,
      }}
    >
      <RobotsTab.Screen name="Robots" component={RobotsStackNavigator} />
      <RobotsTab.Screen name="Test" component={TestStackNavigator} />
      <RobotsTab.Screen name="Test2" component={NewStackNavigator} />
    </RobotsTab.Navigator>
  );
};
