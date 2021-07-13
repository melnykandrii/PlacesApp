import * as React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { RobotsScreen } from "../../features/main/screens/robots.screen";
import { RobotsDetailsScreen } from "../../features/main/screens/robots-details.screen";

const RoboStack = createStackNavigator();

export const RobotsStackNavigator = () => {
  return (
    <RoboStack.Navigator
      initialRouteName="Robots"
      screenOptions={() => ({
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTitleAlign: "center",
      })}
    >
      <RoboStack.Screen
        name="Robots"
        component={RobotsScreen}
        options={{ title: "Robots Friends" }}
      />
      <RoboStack.Screen name="RobotDetails" component={RobotsDetailsScreen} />
    </RoboStack.Navigator>
  );
};
