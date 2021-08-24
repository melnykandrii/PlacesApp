import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Button,
  Alert,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { MapPreview } from "../components/map-preview.component";
import { BackButton } from "../../../components/buttons/goBack-button.component";
import { Text } from "../../../components/typography/text.component";
import { theme } from "../../../infrastructure/theme";
import { useDispatch } from "react-redux";
import * as placesActions from "../../../services/store/actions/places-actions";
import { EditButton } from "../../../components/buttons/edit.button.component";

export const DetailsScreen = ({ route, navigation }) => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { item } = route.params;
  const placesLocation = { lat: item.lat, lng: item.lng };
  const placesTitle = item.title;

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured!", error);
    }
  }, [error]);

  const showMapHandler = () => {
    navigation.navigate("Map", {
      readonly: true,
      initmap: false,
      prevLocation: placesLocation,
      title: placesTitle,
    });
  };

  const onEditHandler = () => {
    navigation.navigate("NewPlace", {
      item: item,
      itemId: item.id,
      edit: true,
      mapPickedLocation: placesLocation,
    });
  };

  const deletePlaceHandler = (id) => {
    Alert.alert("Are you sure?", "Do you realy want to Delete this place?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destractive",
        onPress: async () => {
          setError(null);
          setIsLoading(true);
          try {
            await dispatch(placesActions.deletePlace(id));
            navigation.goBack();
          } catch (err) {
            setError(err.message);
          }
          setIsLoading(false);
        },
      },
    ]);
  };

  return (
    <>
      <BackButton
        title=""
        icon="keyboard-backspace"
        onPress={() => navigation.goBack()}
      />
      <EditButton
        title="Edit"
        onPress={onEditHandler}
        icon="file-document-edit-outline"
      />
      <ScrollView>
        <View style={styles.form}>
          <Text variant="header" style={styles.header}>
            {placesTitle}
          </Text>
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.imageUri }} style={styles.image} />
          </View>

          <Text variant="body" style={styles.address}>
            {item.address}
          </Text>
          <MapPreview
            location={placesLocation}
            style={styles.imagePreview}
            onPress={showMapHandler}
          />
          <Button
            style={styles.button}
            title="Delete"
            onPress={deletePlaceHandler.bind(this, item.id)}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  header: { alignSelf: "center", paddingBottom: 30 },
  address: { marginTop: 5, paddingBottom: 20 },
  imageContainer: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imagePreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
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
