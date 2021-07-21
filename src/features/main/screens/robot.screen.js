import React, { useState } from "react";
import { Provider } from "react-native-paper";
import { SearchBar } from "../components/search-bar.component";
import { robots } from "../../../services/first/robots";
import { List } from "../styles/list.styles";
import { RobotCard } from "../components/robot-card.component";
import { RobotModal } from "../components/robot-modal";
import { SearchContainer, ListContainer } from "../styles/screen.styles";
import { LoadingState } from "../components/loading-state.component";

export const RobotScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [details, setDetails] = useState("");
  const [chars, setChars] = useState("");

  const [filter, setFilter] = useState("");

  const onFilterChange = (text) => {
    setFilter(text);
  };

  const filteredRobot = robots.filter((robot) => {
    return robot.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase());
  });

  return !robots.length ? (
    <LoadingState title="Loading..." color="black" colorTitle="black" />
  ) : (
    <Provider>
      <SearchContainer>
        <SearchBar onFilter={onFilterChange} filter={filter} />
      </SearchContainer>
      <RobotModal
        robot={details}
        chars={chars}
        hideModal={() => {
          setVisible(false);
          setChars("");
        }}
        visible={visible}
        onNavigate={() =>
          navigation.navigate("RobotDetail", {
            itemId: details.id,
            item: details,
          })
        }
      />
      <ListContainer>
        <List
          data={filteredRobot}
          renderItem={({ item }) => (
            <RobotCard
              elevation={15}
              robot={item}
              onPress={() =>
                navigation.navigate("RobotDetail", {
                  itemId: item.id,
                  item: item,
                })
              }
              onLongPress={() => {
                setVisible(true);
                setDetails(item);
                setChars(item.property);
              }}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </ListContainer>
    </Provider>
  );
};
