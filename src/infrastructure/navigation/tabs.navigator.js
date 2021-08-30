import React from "react";
import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MapScreen } from "../../features/map/screens/map.screen";
import { PlacesStackNavigator } from "./places-stack.navigator";
import { theme } from "../theme";
import { Icon } from "react-native-elements";
import { useDispatch } from "react-redux";
import * as authActions from "../../services/store/actions/auth-actions";

const Tab = createBottomTabNavigator();

const LogOutComponent = () => {
  return null;
};

export const TabsNavigator = () => {
  const dispatch = useDispatch();

  const onLogOut = () => {
    dispatch(authActions.logout());
  };

  return (
    <Tab.Navigator
      initialRouteName="List"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "List") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Map") {
            iconName = focused ? "ios-map" : "ios-map-outline";
          } else if (route.name === "LogOut") {
            iconName = focused ? "log-out-outline" : "log-out-outline";
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
      <Tab.Screen
        name="LogOut"
        component={LogOutComponent}
        options={{
          title: "Log Out",
          tabBarButton: (props) => (
            <TouchableOpacity {...props} onPress={onLogOut} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
