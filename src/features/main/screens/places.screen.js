import React, { useEffect, useState } from "react";
import { View, Dimensions, StyleSheet, FlatList } from "react-native";
import { Button } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";
import { SearchBar } from "../components/search-bar.component";
import { PlaceItem } from "../components/place-item.component";
import { theme } from "../../../infrastructure/theme";
import { useSelector } from "react-redux";

export const PlacesScreen = ({ navigation }) => {
  const places = useSelector((state) => state.places.places);
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
  /*
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setAccounts(users));
  });
*/

  return (
    <>
      <View style={styles.searchContainer}>
        <SearchBar onFilter={onFilterChange} filter={searchfield} />
      </View>

      <View style={styles.listContainer}>
        {filteredPlaces == 0 ? (
          <View style={styles.emptyScreen}>
            <Text>No results</Text>
          </View>
        ) : (
          <FlatList
            data={filteredPlaces}
            renderItem={({ item }) => (
              <PlaceItem
                image={null}
                title={item.title}
                address={null}
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
const ButtonSizeH = 50;
const ButtonSizeW = 140;
const deviceWidth = Dimensions.get("window").width / 2 - ButtonSizeW / 2;
const deviceHeight = Dimensions.get("window").height / 1.2;

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
  emptyScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
