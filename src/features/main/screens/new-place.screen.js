import React, { useState } from "react";
import { View, Button, TextInput, ScrollView, StyleSheet } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { useDispatch } from "react-redux";
import * as placesActions from "../../../services/store/actions/places-actions";
import { ImgPicker } from "../components/image-picker.component";
import { theme } from "../../../infrastructure/theme";
import { LocationPicker } from "../components/location-picker.component";

export const NewPlaceScreen = ({ navigation }) => {
  const [titleValue, setTitleValue] = useState("");
  const [placeImage, setPlaceImage] = useState();

  const dispatch = useDispatch();

  const titleChangeHandler = (text) => {
    setTitleValue(text);
  };

  const placeImageHandler = (image) => {
    setPlaceImage(image);
  };

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(titleValue, placeImage));
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
        <ImgPicker onImageTaken={placeImageHandler} />
        <LocationPicker />
        <Button
          style={styles.button}
          title="Save"
          onPress={savePlaceHandler}
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
  button: {
    borderWidth: 2,
    backgroundColor: theme.colors.brand.primary,
    height: 50,
    width: 140,
    justifyContent: "center",
    borderColor: theme.colors.bg.primary,
    borderRadius: 10,
  },
});
