import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { StatusBar, StyleSheet, SafeAreaView } from "react-native";
import { PlacesStackNavigator } from "./src/infrastructure/navigation/places-stack.navigation";
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
            <SafeAreaView style={styles.container}>
              <PlacesStackNavigator />
            </SafeAreaView>
            <ExpoStatusBar style="auto" />
          </NavigationContainer>
        </Provider>
      </ThemeProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});
