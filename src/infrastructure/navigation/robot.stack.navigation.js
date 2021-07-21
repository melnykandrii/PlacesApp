import * as React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { RobotScreen } from "../../features/main/screens/robot.screen";
import { RobotsDetailsScreen } from "../../features/main/screens/robots-details.screen";

const NewStack = createStackNavigator();

export const RobotStackNavigator = () => {
  return (
    <NewStack.Navigator
      headerMode="none"
      initialRouteName="RT"
      screenOptions={() => ({
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTitleAlign: "center",
      })}
    >
      <NewStack.Screen
        name="RT"
        component={RobotScreen}
        options={{ title: "Accounts" }}
      />
      <NewStack.Screen name="RobotDetail" component={RobotsDetailsScreen} />
    </NewStack.Navigator>
  );
};
