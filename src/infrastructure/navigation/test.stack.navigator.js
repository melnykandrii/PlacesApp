import * as React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { TestScreen } from "../../features/main/screens/test.screen";
import { TestDetailsScreen } from "../../features/main/screens/test-details.screen";

const TestStack = createStackNavigator();

export const TestStackNavigator = () => {
  return (
    <TestStack.Navigator
      initialRouteName="TestScreen"
      screenOptions={() => ({
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTitleAlign: "center",
      })}
    >
      <TestStack.Screen
        name="TestScreen"
        component={TestScreen}
        options={{ title: "Robo Friends" }}
      />
      <TestStack.Screen name="TestDetails" component={TestDetailsScreen} />
    </TestStack.Navigator>
  );
};
