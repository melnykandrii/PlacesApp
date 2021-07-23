import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
  FlatList,
} from "react-native";
import { Button } from "react-native-paper";
import { SearchBar } from "../components/search-bar.component";
import { AccountItem } from "../components/account-card.component";
import { theme } from "../../../infrastructure/theme";

export const PlacesScreen = ({ navigation }) => {
  const [accounts, setAccounts] = useState([]);
  const [searchfield, setSearchfield] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setAccounts(users));
  });

  const onFilterChange = (text) => {
    setSearchfield(text);
  };

  const filteredAccount = accounts.filter((a) => {
    return a.name.toLocaleLowerCase().includes(searchfield.toLocaleLowerCase());
  });

  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version === 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <>
      <View style={styles.searchContainer}>
        <SearchBar onFilter={onFilterChange} filter={searchfield} />
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={filteredAccount}
          renderItem={({ item }) => (
            <TouchableCmp
              onPress={() =>
                navigation.navigate("Details", {
                  itemId: item.id,
                  item: item,
                })
              }
            >
              <AccountItem robot={item} />
            </TouchableCmp>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
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
});
