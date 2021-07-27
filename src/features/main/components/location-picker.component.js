import React from "react";
import {
  View,
  Button,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { ThemeConsumer } from "styled-components";
import { Text } from "../../../components/typography/text.component";
import { theme } from "../../../infrastructure/theme";

export const LocationPicker = (props) => {
  const getLocationHandler = () => {};

  return (
    <View>
      <View>
        <Text>No location chosen!</Text>
      </View>
      <Button
        title="Get My Location"
        color={theme.colors.brand.primary}
        onPress={getLocationHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
