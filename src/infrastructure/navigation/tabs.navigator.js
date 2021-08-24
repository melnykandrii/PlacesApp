import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MapScreen } from "../../features/main/screens/map.screen";
import { PlacesStackNavigator } from "./places-stack.navigation";
import { theme } from "../theme";
import { Icon } from "react-native-elements";

const Tab = createBottomTabNavigator();

export const TabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "List") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Map") {
            iconName = focused ? "ios-map" : "ios-map-outline";
          }
          return (
            <Icon name={iconName} type="ionicon" size={size} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: theme.colors.brand.primary,
        inactiveTintColor: "gray",
        keyboardHidesTabBar: true,
      }}
    >
      <Tab.Screen name="List" component={PlacesStackNavigator} />
      <Tab.Screen name="Map" component={MapScreen} />
    </Tab.Navigator>
  );
};
