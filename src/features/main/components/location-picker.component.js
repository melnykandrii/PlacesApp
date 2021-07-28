import React, { useState } from "react";
import {
  View,
  Button,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { Text } from "../../../components/typography/text.component";
import { theme } from "../../../infrastructure/theme";
import * as Location from "expo-location";
import { MapPreview } from "./map-preview.component";

export const LocationPicker = (props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();
  const verifyLocationService = async () => {
    const res = await Location.hasServicesEnabledAsync();
    if (res === false) {
      Alert.alert(
        "Insufusiant permisions!",
        "Location service is disabled, please make sure you've enabled it.",
        [{ text: "Ok" }]
      );
      return false;
    }
    return true;
  };
  const verifyLocationPermissions = async () => {
    const result = await Location.requestForegroundPermissionsAsync();
    if (result.status !== "granted") {
      Alert.alert(
        "Insufusiant permisions!",
        "You need to grant location permisions!",
        [{ text: "Ok" }]
      );
      return false;
    }
    return true;
  };
  const getLocationHandler = async () => {
    const hasService = await verifyLocationService();
    if (!hasService) {
      return;
    }
    const hasPermission = await verifyLocationPermissions();
    if (!hasPermission) {
      return;
    }
    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        accuracy: 5,
      });
      console.log(location);
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        "Could not fetch location!",
        "Please try again later or pick a location on the map.",
        [{ text: "OK" }]
      );
    }
    setIsFetching(false);
  };

  return (
    <View style={styles.container}>
      <MapPreview style={styles.imagePreview} location={pickedLocation}>
        {isFetching ? (
          <ActivityIndicator size="large" color={theme.colors.brand.primary} />
        ) : (
          <Text>No location chosen!</Text>
        )}
      </MapPreview>
      <Button
        title="Get My Location"
        color={theme.colors.brand.primary}
        onPress={getLocationHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  imagePreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
  },
});
