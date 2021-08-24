import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, Alert } from "react-native";
import { useDispatch } from "react-redux";
import * as placesActions from "../../../services/store/actions/places-actions";
import { ImgPicker } from "../components/image-picker.component";
import { theme } from "../../../infrastructure/theme";
import { LocationPicker } from "../components/location-picker.component";
import { BackButton } from "../../../components/buttons/goBack-button.component";
import { LoadingState } from "../components/loading-state.component";
import {
  FormContainer,
  Title,
  Header,
  TitleInput,
} from "../styles/new-place.styles";
import { BodyButton } from "../../../components/buttons/body.buttons";

export const NewPlaceScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { item, edit } = route.params ? route.params : {};
  const itemId = route.params && edit ? item.id : null;

  const [titleValue, setTitleValue] = useState(
    route.params && edit ? item.title : ""
  );
  const [placeImage, setPlaceImage] = useState(
    route.params && edit ? item.imageUri : null
  );
  const [selectedLocation, setSelectedLocation] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured!", error);
    }
  }, [error]);

  const titleChangeHandler = (text) => {
    setTitleValue(text);
  };

  const placeImageHandler = (image) => {
    setPlaceImage(image);
  };

  const locationPickedHandler = useCallback((location) => {
    setSelectedLocation(location);
  }, []);

  const editPlaceHandler = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      if (route.params && edit) {
        await dispatch(
          placesActions.updatePlace(
            itemId,
            titleValue,
            placeImage,
            selectedLocation
          )
        );
      } else {
        await dispatch(
          placesActions.addPlace(titleValue, placeImage, selectedLocation)
        );
      }
      navigation.navigate("Places");
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [
    dispatch,
    edit,
    itemId,
    navigation,
    placeImage,
    route.params,
    selectedLocation,
    titleValue,
  ]);

  return (
    <>
      <BackButton
        title=""
        icon="keyboard-backspace"
        onPress={() => navigation.goBack()}
      />
      {isLoading && <LoadingState label="Saving..." />}
      <ScrollView>
        <FormContainer>
          <Header variant="header">
            {route.params && edit ? "Edit Place" : "New Place"}
          </Header>
          <Title variant="body">Title</Title>
          <TitleInput
            placeholder="Place Title"
            value={titleValue}
            onChangeText={titleChangeHandler}
          />
          <ImgPicker onImageTaken={placeImageHandler} placeImage={placeImage} />
          <LocationPicker
            navigation={navigation}
            route={route}
            onLocationPicked={locationPickedHandler}
          />
          <BodyButton
            title="Save"
            color={theme.colors.brand.primary}
            mode="outlined"
            onNavi={editPlaceHandler}
            disabled={
              !placeImage || titleValue.length <= 2 || !selectedLocation
                ? true
                : false
            }
          />
        </FormContainer>
      </ScrollView>
    </>
  );
};
