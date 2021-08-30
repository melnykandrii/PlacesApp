import * as React from "react";
import { StatusBar, StyleSheet, SafeAreaView } from "react-native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { PlacesScreen } from "../../features/places/screens/places.screen";
import { DetailsScreen } from "../../features/places/screens/places-details.screen";
import { NewPlaceScreen } from "../../features/places/screens/new-place.screen";
import { MapScreen } from "../../features/map/screens/map.screen";

const PlacesStack = createStackNavigator();

export const PlacesStackNavigator = () => {
  return (
    <SafeAreaView style={styles.container}>
      <PlacesStack.Navigator
        headerMode="none"
        initialRouteName="Places"
        screenOptions={() => ({
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })}
      >
        <PlacesStack.Screen name="Places" component={PlacesScreen} />
        <PlacesStack.Screen name="NewPlace" component={NewPlaceScreen} />
        <PlacesStack.Screen name="Details" component={DetailsScreen} />
        <PlacesStack.Screen name="MapSelector" component={MapScreen} />
      </PlacesStack.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});
