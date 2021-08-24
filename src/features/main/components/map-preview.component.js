import React from "react";
import ENV from "../../../../env";
import { PreviewContainer, ImageMap } from "../styles/location-picker.styles";

export const MapPreview = (props) => {
  let imagePreviewUrl;

  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7C${props.location.lat},${props.location.lng}&key=${ENV.googleApiKey}`;
  }
  return (
    <PreviewContainer onPress={props.onPress}>
      {props.location ? (
        <ImageMap source={{ uri: imagePreviewUrl }} />
      ) : (
        props.children
      )}
    </PreviewContainer>
  );
};
