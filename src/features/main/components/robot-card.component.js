import React from "react";
import {
  CardView,
  CardCover,
  CardTitle,
  CardDescription,
} from "../styles/card.styles";

export const RobotCard = ({ onPress, onLongPress, robot, props }) => (
  <CardView {...props} onPress={onPress} onLongPress={onLongPress}>
    <CardCover source={{ uri: `https://robohash.org/name+${robot.id}` }} />
    <CardTitle variant="header">{robot.name}</CardTitle>
    <CardDescription variant="caption">{robot.email}</CardDescription>
  </CardView>
);
