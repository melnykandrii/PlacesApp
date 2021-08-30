import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { TabsNavigator } from "./tabs.navigator";
import { StartupScreen } from "../../features/startup/screens/startup.screen";
import { AuthStackNavigator } from "./auth-stack.navigator";
import { TestScreen } from "../../features/test/test.screen";

export const AppNavigator = () => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const tryAuth = useSelector((state) => state.auth.tryauth);

  return (
    <NavigationContainer>
      {isAuth && <TabsNavigator />}
      {!tryAuth && !isAuth && <StartupScreen />}
      {tryAuth && !isAuth && <AuthStackNavigator />}
    </NavigationContainer>
  );
};
