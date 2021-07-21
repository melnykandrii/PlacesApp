import * as React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { AccountScreen } from "../../features/main/screens/account.screen";
import { AccountDetailsScreen } from "../../features/main/screens/account-details.screen";

const RoboStack = createStackNavigator();

export const AccountStackNavigator = () => {
  return (
    <RoboStack.Navigator
      initialRouteName="Account"
      screenOptions={() => ({
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTitleAlign: "center",
      })}
    >
      <RoboStack.Screen
        name="Account"
        component={AccountScreen}
        options={{ title: "Friends" }}
      />
      <RoboStack.Screen name="RobotDetails" component={AccountDetailsScreen} />
    </RoboStack.Navigator>
  );
};
