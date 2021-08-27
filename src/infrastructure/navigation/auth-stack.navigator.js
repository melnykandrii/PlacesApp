import * as React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { AuthScreen } from "../../features/main/screens/authentication.screen";
import { PlacesStackNavigator } from "../../infrastructure/navigation/places-stack.navigation";
import { MapScreen } from "../../features/main/screens/map.screen";
import { StartupScreen } from "../../features/main/screens/startup.screen";

const AuthStack = createStackNavigator();

export const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      headerMode="none"
      initialRouteName="Auth"
      screenOptions={() => ({
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      })}
    >
      <AuthStack.Screen name="Auth" component={AuthScreen} />
    </AuthStack.Navigator>
  );
};
