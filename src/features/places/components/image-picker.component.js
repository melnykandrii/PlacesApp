import React, { useState } from "react";
import { Button, Image, View, StyleSheet, Alert } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { theme } from "../../../infrastructure/theme";
import * as ImagePicker from "expo-image-picker";

export const ImgPicker = (props) => {
  const [pickedImage, setPickedImage] = useState(props.placeImage);

  const verifyCameraPermissions = async () => {
    const result = await ImagePicker.requestCameraPermissionsAsync();
    if (result.status !== "granted") {
      Alert.alert(
        "Insufusiant permisions!",
        "You need to grant camera permisions!",
        [{ text: "Ok" }]
      );
      return false;
    }
    return true;
  };

  const verifyMediaPermissions = async () => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.status !== "granted") {
      Alert.alert(
        "Insufusiant permisions!",
        "You need to grant media-library permisions!",
        [{ text: "Ok" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyCameraPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.3,
    });
    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
  };

  const selectImageHandler = async () => {
    const hasPermission = await verifyMediaPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.3,
    });
    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
  };

  return (
    <View style={styles.imagePickerContainer}>
      <View style={styles.imageContainer}>
        {!pickedImage ? (
          <Text>No image picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title="Shoot"
          color={theme.colors.brand.primary}
          onPress={takeImageHandler}
        />
        <Button
          style={styles.button}
          title="Select"
          color={theme.colors.brand.primary}
          onPress={selectImageHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePickerContainer: {
    marginBottom: 15,
  },
  imageContainer: {
    width: "100%",
    height: 180,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    borderWidth: 2,
    backgroundColor: theme.colors.brand.primary,
    height: 50,
    width: 140,
    borderColor: theme.colors.bg.primary,
    borderRadius: 10,
  },
});
