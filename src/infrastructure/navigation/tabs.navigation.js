import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { AccountStackNavigator } from "./account.stack.navigation";
import { RobotStackNavigator } from "./robot.stack.navigation";
import { theme } from "../theme";

const RobotsTab = createBottomTabNavigator();

export const TabsNavigator = () => {
  return (
    <RobotsTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Accounts") {
            iconName = focused ? "emoticon-poop" : "emoticon-poop-outline";
          } else if (route.name === "Robots") {
            iconName = focused ? "baby-face" : "baby-face-outline";
          }
          return (
            <Icon
              name={iconName}
              type="material-community"
              size={30}
              color={color}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: theme.colors.brand.aqua,
        inactiveTintColor: "gray",
        keyboardHidesTabBar: true,
      }}
    >
      <RobotsTab.Screen name="Accounts" component={AccountStackNavigator} />
      <RobotsTab.Screen name="Robots" component={RobotStackNavigator} />
    </RobotsTab.Navigator>
  );
};
