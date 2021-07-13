import * as React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { RobotsTestScreen } from "../../features/main/screens/robot.test.screen";
import { NewScreen } from "../../features/main/screens/new.screen";

const NewStack = createStackNavigator();

export const NewStackNavigator = () => {
  return (
    <NewStack.Navigator
      initialRouteName="RT"
      screenOptions={() => ({
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTitleAlign: "center",
      })}
    >
      <NewStack.Screen
        name="RT"
        component={RobotsTestScreen}
        options={{ title: "Robots Friends" }}
      />
      <NewStack.Screen name="NewScreen" component={NewScreen} />
    </NewStack.Navigator>
  );
};
