import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { ImageBack, TitleContainer } from "../styles/details.styles";
import { Text } from "../../../components/typography/text.component";
import { RowContainer } from "../styles/modal.styles";
import { InteractionComponent } from "../components/interaction.component";
import { Spacer } from "../../../components/spacer/spacer.component";

export const AccountDetailsScreen = ({ route }) => {
  const { itemId, item } = route.params;
  const [hidden, setHidden] = useState(true);

  return (
    <View>
      <View>
        <ImageBack source={{ uri: `https://robohash.org/name+${itemId}` }} />
      </View>

      <ScrollView>
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
      </ScrollView>
    </View>
  );
};
