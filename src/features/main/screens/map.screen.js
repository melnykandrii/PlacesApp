import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { theme } from "../../../infrastructure/theme";
import { Button } from "react-native-paper";
import { BackButton } from "../../../components/buttons/goBack-button.component";

const ButtonSizeH = 50;
const ButtonSizeW = 140;
const deviceWidth = Dimensions.get("window").width / 2 - ButtonSizeW / 2;
const deviceHeight = Dimensions.get("window").height / 1.2;

export const MapScreen = ({ navigation, route }) => {
  const prevData = route.params;
  const initLocation = prevData.prevLocation;
  const readOnly = prevData.readonly;
  const PlaceTitle = prevData.title;
  const [chosenLoction, setChosenLocation] = useState(initLocation);

  const [mapRegion, setMapRegion] = useState({
    latitude: chosenLoction ? chosenLoction.lat : 37.78,
    longitude: chosenLoction ? chosenLoction.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  useEffect(() => {
    if (prevData) {
      setChosenLocation(prevData.prevLocation);
    }
  }, [prevData]);
  const onRegionChangeHandler = (region) => setMapRegion(region);

  const selectLocationHandler = (event) => {
    if (readOnly) {
      return;
    }
    setChosenLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  let markerCoordinates;

  if (chosenLoction) {
    markerCoordinates = {
      latitude: chosenLoction.lat,
      longitude: chosenLoction.lng,
    };
  }
  const savePickedLocationHandler = () => {
    navigation.navigate("NewPlace", {
      mapPickedLocation: chosenLoction,
      pickedRegion: mapRegion,
    });
  };

  return (
    <>
      <BackButton
        title=""
        icon="keyboard-backspace"
        onPress={() => navigation.goBack()}
      />
      <MapView
        style={styles.map}
        region={mapRegion}
        onPress={selectLocationHandler}
        onRegionChangeComplete={onRegionChangeHandler}
      >
        {markerCoordinates && (
          <Marker
            draggable
            title={prevData ? PlaceTitle : "My location"}
            coordinate={markerCoordinates}
          />
        )}
      </MapView>
      {markerCoordinates && !readOnly && (
        <Button
          icon="check"
          mode="text"
          onPress={savePickedLocationHandler}
          style={styles.fav}
          theme={{
            colors: {
              primary: theme.colors.bg.primary,
            },
          }}
        >
          Save
        </Button>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  fav: {
    position: "absolute",
    top: deviceHeight,
    right: deviceWidth,
    zIndex: 9,
    borderWidth: 2,
    backgroundColor: theme.colors.brand.primary,
    height: ButtonSizeH,
    width: ButtonSizeW,
    justifyContent: "center",
    borderColor: theme.colors.bg.primary,
    borderRadius: 10,
  },
});
