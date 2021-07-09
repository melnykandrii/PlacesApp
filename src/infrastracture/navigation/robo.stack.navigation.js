import * as React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { RobotsScreen } from "../../features/main/screens/robots.screen";
import { TestScreen } from "../../features/main/screens/test.screen";

const RoboStack = createStackNavigator();

export const RoboStackNavigator = () => {
  return (
    <RoboStack.Navigator
      initialRouteName="Robots"
      headerMode="none"
      screenOptions={() => ({
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      })}
    >
      <RoboStack.Screen name="Robots" component={RobotsScreen} />
      <RoboStack.Screen name="Test" component={TestScreen} />
    </RoboStack.Navigator>
  );
};
