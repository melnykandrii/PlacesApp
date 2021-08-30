import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { theme } from "../../../infrastructure/theme";
import * as authActions from "../../../services/store/actions/auth-actions";

export const AccountBackground = styled.ImageBackground.attrs({
  source: require("../../../../assets/splash.png"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        dispatch(authActions.setAuth());
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        dispatch(authActions.setAuth());
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      dispatch(authActions.authenticate(userId, token, expirationTime));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <AccountBackground>
      <View style={styles.screen}>
        <ActivityIndicator size="large" color={theme.colors.brand.primary} />
      </View>
    </AccountBackground>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 70,
  },
});
