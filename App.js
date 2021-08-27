import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import {
  useFonts as useDomine,
  Domine_400Regular,
} from "@expo-google-fonts/domine";
import { theme } from "./src/infrastructure/theme";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import placesReducer from "./src/services/store/reducers/places-reducers";
import { init } from "./src/services/helper/db";
import { TabsNavigator } from "./src/infrastructure/navigation/tabs.navigator";
import { AuthStackNavigator } from "./src/infrastructure/navigation/auth-stack.navigator";

init()
  .then(() => {})
  .catch((err) => {
    console.log("Initialized db failed");
    console.log(err);
  });

const rootReducer = combineReducers({
  places: placesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  const [domineLoaded] = useDomine({
    Domine_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded || !domineLoaded) {
    return null;
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <NavigationContainer>
            <AuthStackNavigator />
            <ExpoStatusBar style="auto" />
          </NavigationContainer>
        </Provider>
      </ThemeProvider>
    </>
  );
}
