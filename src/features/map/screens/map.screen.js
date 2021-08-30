import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Alert } from "react-native";
import { Marker, Callout } from "react-native-maps";
import { BackButton } from "../../../components/buttons/goBack-button.component";
import { useSelector, useDispatch } from "react-redux";
import * as placesActions from "../../../services/store/actions/places-actions";
import { MapCallout } from "../components/map-callout.component";
import { LoadingState } from "../../../components/states/loading-state.component";
import { MainButton } from "../../../components/buttons/centered-button.component";
import { Map } from "../styles/map.styles";

export const MapScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [initMap, setInitMap] = useState(true);
  const places = useSelector((state) => state.places.places);
  const dispatch = useDispatch();
  const prevData = useMemo(
    () =>
      route.params
        ? route.params
        : { prevLocation: null, readonly: true, initmap: true },
    [route.params]
  );
  const initLocation = prevData.prevLocation ? prevData.prevLocation : null;
  const PlaceTitle = prevData.title ? prevData.title : null;
  const [chosenLoction, setChosenLocation] = useState(initLocation);
  const [readOnly, setReadOnly] = useState(true);

  const [mapRegion, setMapRegion] = useState({
    latitude: chosenLoction ? chosenLoction.lat : 37.78,
    longitude: chosenLoction ? chosenLoction.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    if (prevData) {
      setChosenLocation(prevData.prevLocation);
      setReadOnly(prevData.readonly);
      setInitMap(prevData.initmap);
    }
  }, [prevData]);

  const loadPlacesHandler = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(placesActions.loadPlaces());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setError, setIsLoading]);

  useEffect(() => {
    loadPlacesHandler();
  }, [dispatch, loadPlacesHandler, setIsLoading]);

  useEffect(() => {
    const willFocus = navigation.addListener("focus", loadPlacesHandler);
    return willFocus;
  }, [loadPlacesHandler, navigation]);

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
      {isLoading && <LoadingState label="Loading..." />}
      {!initMap && (
        <BackButton
          title=""
          icon="keyboard-backspace"
          onPress={() => navigation.goBack()}
        />
      )}
      <Map
        region={mapRegion}
        onPress={selectLocationHandler}
        onRegionChangeComplete={onRegionChangeHandler}
      >
        {markerCoordinates && (
          <Marker
            draggable
            title={prevData && readOnly ? PlaceTitle : "My location"}
            coordinate={markerCoordinates}
          />
        )}
        {readOnly &&
          !route.params &&
          places.map((item) => {
            return (
              <Marker
                key={item.id}
                title={item.title}
                coordinate={{
                  latitude: item.lat,
                  longitude: item.lng,
                }}
              >
                <Callout
                  tooltip={true}
                  onPress={() => navigation.navigate("Details", { item })}
                >
                  <MapCallout place={item} />
                </Callout>
              </Marker>
            );
          })}
      </Map>
      {markerCoordinates && !readOnly && (
        <MainButton
          title="Save"
          mode="outlined"
          onNavi={savePickedLocationHandler}
        />
      )}
    </>
  );
};
