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
      screenOptions={() => ({
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTitleAlign: "center",
      })}
    >
      <RoboStack.Screen
        name="Robots"
        component={RobotsScreen}
        options={{ title: "Robo Friends" }}
      />
      <RoboStack.Screen name="Test" component={TestScreen} />
    </RoboStack.Navigator>
  );
};
