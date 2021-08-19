import React, { useState, useEffect } from "react";
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

export const LocationPicker = ({ navigation, route, onLocationPicked }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();
  const [prevRegion, setPrevRegion] = useState();

  const mapLocation = route.params;

  useEffect(() => {
    if (mapLocation) {
      setPickedLocation(mapLocation.mapPickedLocation);
      setPrevRegion(mapLocation.pickedRegion);
      onLocationPicked(mapLocation.mapPickedLocation);
    }
  }, [mapLocation, onLocationPicked]);

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
    setPickedLocation();
    setIsFetching(true);
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: 5,
      });
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      onLocationPicked({
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

  const pickOnMapHandler = () => {
    navigation.navigate("Map", {
      prevLocation: pickedLocation,
    });
  };

  return (
    <View style={styles.container}>
      <MapPreview
        style={styles.imagePreview}
        location={pickedLocation}
        onPress={pickOnMapHandler}
        isFetching={isFetching}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={theme.colors.brand.primary} />
        ) : (
          <Text>No location chosen!</Text>
        )}
      </MapPreview>
      <View style={styles.buttonContainer}>
        <Button
          title="Get My Location"
          color={theme.colors.brand.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick on Map"
          color={theme.colors.brand.primary}
          onPress={pickOnMapHandler}
        />
      </View>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
