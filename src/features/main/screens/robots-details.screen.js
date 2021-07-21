import React, { useState } from "react";

import { Text } from "../../../components/typography/text.component";
import { RowContainer } from "../styles/robot-modal.styles";
import { InteractionComponent } from "../components/interaction.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { BodyButton } from "../../../components/buttons/body.buttons";
import {
  Screen,
  ImageContainer,
  ScrollContainer,
  ButtonContainer,
  ImageBack,
  TitleContainer,
  BottomContainer,
} from "../styles/robot-datails.styles";

export const RobotsDetailsScreen = ({ route }) => {
  const { itemId, item } = route.params;
  const [hidden, setHidden] = useState(true);

  return (
    <Screen>
      <ImageContainer>
        <ImageBack source={{ uri: `https://robohash.org/name+${itemId}` }} />
      </ImageContainer>

      <ScrollContainer>
        <TitleContainer>
          <Text variant="header">{Object.values(item.name)}</Text>
        </TitleContainer>
        <Spacer size="large" />
        <RowContainer>
          <InteractionComponent
            name="user-tie"
            type="font-awesome-5"
            color="#f50"
            size={20}
            variant="caption"
            onPress={() => {
              setHidden(hidden === true ? false : true);
            }}
            char={hidden ? Object.values(item.username) : "User"}
          />
          <InteractionComponent
            name="envelope"
            type="font-awesome-5"
            color="#f50"
            size={20}
            variant="caption"
            onPress={() => {
              setHidden(hidden === true ? false : true);
            }}
            char={hidden ? Object.values(item.email) : "Email"}
          />
        </RowContainer>
        <Spacer size="large" />
        <RowContainer>
          <InteractionComponent
            name="heartbeat"
            type="font-awesome"
            color="#f50"
            size={20}
            variant="caption"
            onPress={() => {
              setHidden(hidden === true ? false : true);
            }}
            char={
              hidden
                ? Object.values(item.property.capacity.toString())
                : "Capacity"
            }
          />
          <InteractionComponent
            name="barbell-outline"
            type="ionicon"
            color="#f50"
            size={20}
            variant="caption"
            onPress={() => {
              setHidden(hidden === true ? false : true);
            }}
            char={
              hidden ? Object.values(item.property.power.toString()) : "Power"
            }
          />
        </RowContainer>
        <Spacer size="large" />
        <RowContainer>
          <InteractionComponent
            name="body"
            type="ionicon"
            color="#f50"
            size={20}
            variant="caption"
            onPress={() => {
              setHidden(hidden === true ? false : true);
            }}
            char={
              hidden ? Object.values(item.property.size.toString()) : "Size"
            }
          />
          <InteractionComponent
            name="rocket"
            type="ionicon"
            color="#f50"
            size={20}
            variant="caption"
            onPress={() => {
              setHidden(hidden === true ? false : true);
            }}
            char={
              hidden ? Object.values(item.property.speed.toString()) : "Speed"
            }
          />
        </RowContainer>
        <Spacer size="large" />
        <RowContainer>
          <InteractionComponent
            name="battery-full-outline"
            type="ionicon"
            color="#f50"
            size={20}
            variant="caption"
            onPress={() => {
              setHidden(hidden === true ? false : true);
            }}
            char={
              hidden
                ? Object.values(item.property.battery.toString())
                : "Battery"
            }
          />
          <InteractionComponent
            name="cash-outline"
            type="ionicon"
            color="#f50"
            size={20}
            variant="caption"
            onPress={() => {
              setHidden(hidden === true ? false : true);
            }}
            char={hidden ? Object.values(item.price.toString()) : "Price"}
          />
        </RowContainer>
        <BottomContainer>
          <Text variant="bodyTitle">Description:</Text>
          <Text variant="body" ellipsizeMode="tail">
            {Object.values(item.description)}
          </Text>
        </BottomContainer>
      </ScrollContainer>
      <ButtonContainer>
        <BodyButton title="Buy" onNavi={() => null} mode="contained" />
      </ButtonContainer>
    </Screen>
  );
};
