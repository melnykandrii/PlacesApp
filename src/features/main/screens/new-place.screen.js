import React, { useState } from "react";
import { View, Button, TextInput, ScrollView, StyleSheet } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { useDispatch } from "react-redux";
import * as placesActions from "../../../services/store/actions/places-actions";

export const NewPlaceScreen = ({ navigation }) => {
  const [titleValue, setTitleValue] = useState("");

  const dispatch = useDispatch();

  const titleChangeHandler = (text) => {
    setTitleValue(text);
  };

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(titleValue));
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text variant="header" style={styles.header}>
          New Place
        </Text>
        <Text variant="body" style={styles.title}>
          Title
        </Text>
        <TextInput
          placeholder="Place Title"
          style={styles.input}
          value={titleValue}
          onChangeText={titleChangeHandler}
        />
        <Button
          title="Save"
          onPress={savePlaceHandler}
          style={styles.button}
          disabled={titleValue.length <= 2 ? true : false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  header: { alignSelf: "center" },
  title: { marginTop: 5, paddingBottom: 8 },
  input: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 5,
    paddingHorizontal: 2,
  },
  button: { margin: 60 },
});
