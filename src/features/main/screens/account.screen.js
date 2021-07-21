import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { SearchBar } from "../components/search-bar.component";
import { AccountItem } from "../components/account-card.component";
import { LoadingState } from "../components/loading-state.component";
//import { robots } from "../../../services/first/robots";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

export const AccountScreen = ({ navigation }) => {
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
  return !accounts.length ? (
    <LoadingState title="Loading..." color="black" colorTitle="black" />
  ) : (
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
                navigation.navigate("RobotDetails", {
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
    </>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
  },
  listContainer: {
    padding: 5,
    flex: 9,
  },
});
