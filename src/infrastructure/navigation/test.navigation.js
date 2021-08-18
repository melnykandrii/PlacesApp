import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../features/test/screens/home.screen";
import CreatePostScreen from "../../features/test/screens/post.screen";
const Stack = createStackNavigator();

export default function TestStackNavigator() {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CreatePost" component={CreatePostScreen} />
    </Stack.Navigator>
  );
}
