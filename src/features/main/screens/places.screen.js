import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";
import { SearchBar } from "../components/search-bar.component";
import { PlaceItem } from "../components/place-item.component";
import { theme } from "../../../infrastructure/theme";
import { useSelector, useDispatch } from "react-redux";
import * as placesActions from "../../../services/store/actions/places-actions";

const ButtonSizeH = 50;
const ButtonSizeW = 120;
const deviceWidth = Dimensions.get("window").width / 2 - ButtonSizeW / 2;
const deviceHeight = Dimensions.get("window").height / 1.2;

export const PlacesScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const places = useSelector((state) => state.places.places);
  const dispatch = useDispatch();

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
  }, [dispatch, loadPlacesHandler]);

  useEffect(() => {
    const willFocus = navigation.addListener("focus", loadPlacesHandler);
    return willFocus;
  }, [loadPlacesHandler, navigation]);

  //const [displayPlace, setdisplayPlace] = useState(places);
  const [searchfield, setSearchfield] = useState("");

  const onFilterChange = (text) => {
    setSearchfield(text);
  };

  const filteredPlaces = places.filter((a) => {
    return a.title
      .toLocaleLowerCase()
      .includes(searchfield.toLocaleLowerCase());
  });

  return (
    <>
      <View style={styles.searchContainer}>
        <SearchBar onFilter={onFilterChange} filter={searchfield} />
      </View>

      <View style={styles.listContainer}>
        {isLoading && (
          <View style={styles.centered}>
            <ActivityIndicator
              size="large"
              color={theme.colors.brand.primary}
            />
            <Text variant="load">Loading...</Text>
          </View>
        )}
        {!isLoading && !error && filteredPlaces.length === 0 && (
          <View style={styles.centered}>
            <Text>No results. Please try again.</Text>
          </View>
        )}
        {!isLoading && error && (
          <View style={styles.centered}>
            <Text>An error occurred. Please try again.</Text>
            <Button
              mode="text"
              onPress={loadPlacesHandler}
              theme={{
                colors: {
                  primary: theme.colors.brand.primary,
                },
              }}
            >
              Try again
            </Button>
          </View>
        )}
        {!isLoading && filteredPlaces && (
          <FlatList
            data={filteredPlaces}
            renderItem={({ item }) => (
              <PlaceItem
                image={item.imageUri}
                title={item.title}
                address={item.address}
                onSelect={() => navigation.navigate("Details", { item: item })}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </View>

      <Button
        icon="plus"
        mode="text"
        onPress={() => navigation.navigate("NewPlace")}
        style={styles.fav}
        theme={{
          colors: {
            primary: theme.colors.bg.primary,
          },
        }}
      >
        Add New
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
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
  searchContainer: {
    flex: 1,
  },
  listContainer: {
    padding: 5,
    flex: 9,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
