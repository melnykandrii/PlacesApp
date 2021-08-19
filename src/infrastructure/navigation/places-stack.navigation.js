import * as React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { PlacesScreen } from "../../features/main/screens/places.screen";
import { DetailsScreen } from "../../features/main/screens/places-details.screen";
import { NewPlaceScreen } from "../../features/main/screens/new-place.screen";
import { MapScreen } from "../../features/main/screens/map.screen";
import { EditScreen } from "../../features/main/screens/places-edit.screen";

const PlacesStack = createStackNavigator();

export const PlacesStackNavigator = () => {
  return (
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
      <PlacesStack.Screen name="EditScreen" component={EditScreen} />
      <PlacesStack.Screen name="Map" component={MapScreen} />
    </PlacesStack.Navigator>
  );
};
