import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import ENV from "../../../../env";

export const MapPreview = (props) => {
  let imagePreviewUrl;

  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7C${props.location.lat},${props.location.lng}&key=${ENV.googleApiKey}`;
  }
  return (
    <TouchableOpacity
      style={{ ...styles.imagePreview, ...props.style }}
      onPress={props.onPress}
    >
      {props.location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  imagePreview: {
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});
