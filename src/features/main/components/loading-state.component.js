import React from "react";
import {
  LoadingContainer,
  LoadingIcon,
  LoadingTitle,
} from "../styles/loading-state.styles.js";

export const LoadingState = (props) => {
  return (
    <LoadingContainer>
      <LoadingIcon {...props} />
      <LoadingTitle {...props}>{props.title}</LoadingTitle>
    </LoadingContainer>
  );
};
