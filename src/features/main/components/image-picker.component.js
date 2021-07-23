import React from "react";
import { Button, Image, View, Platform, StyleSheet } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { theme } from "../../../infrastructure/theme";
import * as ImagePicker from "expo-image-picker";

export const ImagePickerComponent = (props) => {
  const selectImageHandler = () => {};

  return (
    <View>
      <View>
        <Text>No Image selected</Text>
        <Image />
      </View>
      <Button
        title="Add Image"
        color={theme.colors.brand.primary}
        onPress={selectImageHandler}
      />
    </View>
  );
};
