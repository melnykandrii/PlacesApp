import React, { useEffect, useState, useCallback } from "react";
import { FlatList, RefreshControl } from "react-native";
import { SearchBar } from "../components/search-bar.component";
import { PlaceItem } from "../components/place-item.component";
import { theme } from "../../../infrastructure/theme";
import { useSelector, useDispatch } from "react-redux";
import { MainButton } from "../../../components/buttons/centered-button.component";
import * as placesActions from "../../../services/store/actions/places-actions";
import { LoadingState } from "../../../components/states/loading-state.component";
import { ListContainer, SearchContainer } from "../styles/place-screen.styles";
import { EmptyStateScreen } from "../components/empty-state.screen";

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
    const focus = navigation.addListener("focus", loadPlacesHandler);
    return () => {
      focus();
    };
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
        {!isLoading &&
          !error &&
          places.length > 0 &&
          filteredPlaces.length === 0 && (
            <EmptyStateScreen
              icon="map-search-outline"
              label="We could not find any place."
              description="Please adjust search criteria and try again."
            />
          )}
        {!isLoading && !error && places.length === 0 && (
          <EmptyStateScreen
            icon="information-outline"
            label="You don't have any saved place."
            description="Plese add one in order to see it here."
          />
        )}
        {isLoading && <LoadingState label="Loading..." />}
        {!isLoading && error && (
          <EmptyStateScreen
            icon="close-circle"
            label="An error occurred. Please try again."
            title="Try again"
            mode="outlined"
            onNavi={loadPlacesHandler}
            buttonColor={theme.colors.brand.primary}
          />
        )}
        {!isLoading && filteredPlaces && !error && (
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
            keyExtractor={(item) => item.id}
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
