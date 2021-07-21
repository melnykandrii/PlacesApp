import React, { useState, useEffect } from "react";
import { Portal } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";
import { CloseButton } from "../../../components/buttons/close.button.component";
import {
  ImageContainer,
  ModalContainer,
  TopContainer,
  ModalImage,
  TitleContainer,
  DetailsContainer,
  RowContainer,
  ButtonContainer,
} from "../styles/modal.styles";
import { BodyButton } from "../../../components/buttons/body.buttons";
import { InteractionComponent } from "./interaction.component";

export const RobotModal = ({
  chars,
  robot,
  hideModal,
  visible,
  onNavigate,
}) => {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    setHidden(true);
  }, [chars]);

  return (
    <Portal>
      <ModalContainer visible={visible} onDismiss={hideModal}>
        <TopContainer>
          <CloseButton onClose={hideModal} name="close" />
        </TopContainer>
        <ImageContainer>
          <ModalImage
            source={{ uri: `https://robohash.org/name+${robot.id}` }}
          />
        </ImageContainer>
        <TitleContainer>
          <Text variant="header">{robot.name}</Text>
          <Text variant="caption">{robot.email}</Text>
        </TitleContainer>
        <DetailsContainer>
          <RowContainer>
            <InteractionComponent
              name="heartbeat"
              type="font-awesome"
              color="#f50"
              size={20}
              onPress={() => {
                setHidden(hidden === true ? false : true);
              }}
              variant="caption"
              char={hidden ? chars.capacity : "Capacity"}
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
              char={hidden ? chars.power : "Power"}
            />
          </RowContainer>
          <RowContainer>
            <InteractionComponent
              name="body-outline"
              type="ionicon"
              color="#f50"
              size={20}
              variant="caption"
              onPress={() => {
                setHidden(hidden === true ? false : true);
              }}
              char={hidden ? chars.size : "Size"}
            />
            <InteractionComponent
              name="rocket-outline"
              type="ionicon"
              color="#f50"
              size={20}
              variant="caption"
              char={hidden ? chars.speed : "Speed"}
            />
          </RowContainer>
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
              char={hidden ? chars.battery : "Battery"}
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
              char={hidden ? robot.price : "Price"}
            />
          </RowContainer>
        </DetailsContainer>
        <ButtonContainer>
          <BodyButton
            onNavi={onNavigate}
            color="black"
            mode="outlined"
            title="Details"
          />
        </ButtonContainer>
      </ModalContainer>
    </Portal>
  );
};
