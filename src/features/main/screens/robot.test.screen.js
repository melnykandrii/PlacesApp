import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableNativeFeedback,
  Platform,
  Image,
} from "react-native";

const DATA = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "Nathan@yesenia.net",
  },
];

const RobotItem = ({ id, name, email }) => {
  return (
    <TouchableNativeFeedback onPress={null} useForeground>
      <View style={styles.robotItem}>
        <View styel={styles.imageContainer}>
          <Image
            style={styles.bgImage}
            source={{ uri: `https://robohash.org/${id}` }}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{name}</Text>
          <Text>{email}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export const RobotsTestScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <RobotItem id={item.id} name={item.name} email={item.email} />
  );
  return (
    <>
      <View style={styles.searchContainer}>
        <Text>Hi</Text>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <View>
        <Button
          title="New Screen"
          onPress={() => navigation.navigate("NewScreen")}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: "blue",
    flex: 1,
  },
  listContainer: {
    flex: 9,
    backgroundColor: "green",
  },
  robotItem: {
    height: 300,
    margin: 20,
    width: "60%",
    alignSelf: "center",
    backgroundColor: "grey",
    borderRadius: 10,
    overflow:
      Platform.OS === "android" && Platform.Version >= 21
        ? "visible"
        : "visible",
    elevation: 5,
  },
  bgImage: {
    width: "80%",
    height: "80%",
    alignSelf: "center",
  },
  titleContainer: {
    flex: 4,
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    color: "black",
    textAlign: "center",
  },
});
