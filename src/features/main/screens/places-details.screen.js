import React, { useEffect, useState } from "react";
import { ScrollView, Alert } from "react-native";
import { MapPreview } from "../components/map-preview.component";
import { BackButton } from "../../../components/buttons/goBack-button.component";
import { theme } from "../../../infrastructure/theme";
import { useDispatch } from "react-redux";
import * as placesActions from "../../../services/store/actions/places-actions";
import { EditButton } from "../../../components/buttons/edit.button.component";
import { LoadingState } from "../components/loading-state.component";
import {
  Address,
  Header,
  FormContainer,
  ImageContainer,
  ImagePreview,
} from "../styles/place-details.styles";
import { BodyButton } from "../../../components/buttons/body.buttons";
import { Spacer } from "../../../components/spacer/spacer.component";

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
      {isLoading && <LoadingState label="Deleting..." />}
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
        <FormContainer>
          <Header variant="header">{placesTitle}</Header>
          <ImageContainer>
            <ImagePreview source={{ uri: item.imageUri }} />
          </ImageContainer>

          <Address variant="body">{item.address}</Address>
          <MapPreview location={placesLocation} onPress={showMapHandler} />
          <Spacer position="top" size="xxxl">
            <BodyButton
              title="Delete"
              color={theme.colors.brand.primary}
              mode="outlined"
              onNavi={deletePlaceHandler.bind(this, item.id)}
            />
          </Spacer>
        </FormContainer>
      </ScrollView>
    </>
  );
};
