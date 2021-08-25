import React, { useEffect, useState, useCallback } from "react";
import { FlatList, RefreshControl } from "react-native";
import { SearchBar } from "../components/search-bar.component";
import { PlaceItem } from "../components/place-item.component";
import { theme } from "../../../infrastructure/theme";
import { useSelector, useDispatch } from "react-redux";
import { MainButton } from "../components/centered-button.component";
import * as placesActions from "../../../services/store/actions/places-actions";
import { EmptyScreen } from "../components/empty-screen.component";
import { LoadingState } from "../components/loading-state.component";
import { ListContainer, SearchContainer } from "../styles/place-screen.styles";
import { ErrorScreen } from "../components/error-screen";

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
  }, [dispatch, setError]);

  useEffect(() => {
    loadPlacesHandler();
  }, [dispatch, loadPlacesHandler, setIsLoading]);

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
      <SearchContainer>
        <SearchBar onFilter={onFilterChange} filter={searchfield} />
      </SearchContainer>
      <ListContainer>
        {isLoading && <LoadingState label="Loading..." />}
        {!isLoading && !error && filteredPlaces.length === 0 && (
          <EmptyScreen label="No results. Please try again." />
        )}
        {!isLoading && error && (
          <ErrorScreen
            label="An error occurred. Please try again."
            title="Try again"
            mode="outlined"
            onNavi={loadPlacesHandler}
            color={theme.colors.brand.primary}
          />
        )}
        {!isLoading && filteredPlaces && (
          <FlatList
            data={filteredPlaces}
            refreshControl={
              <RefreshControl
                tintColor={theme.colors.brand.primary}
                colors={[theme.colors.brand.primary]}
                refreshing={isLoading}
                onRefresh={loadPlacesHandler}
              />
            }
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
      </ListContainer>
      {!error && (
        <MainButton
          title="Add New"
          mode="outlined"
          onNavi={() => navigation.navigate("NewPlace")}
        />
      )}
    </>
  );
};
