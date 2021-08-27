import React from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
} from "react-native";
import { BodyButton } from "../../../components/buttons/body.buttons";
import { Card } from "../../../components/card/card.component";
import { Input } from "../../../components/typography/input.component";
import { theme } from "../../../infrastructure/theme";
import styled from "styled-components";

import { LinearGradient } from "expo-linear-gradient";
import { Spacer } from "../../../components/spacer/spacer.component";

const AccountBackground = styled.ImageBackground.attrs({
  source: require("../../../../assets/home_bg_places.jpg"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const AccountCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.4);
`;

export const AuthScreen = () => {
  return (
    <AccountBackground>
      <AccountCover>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={10}
          style={styles.screenContainer}
        >
          <Card style={styles.authScreenContainer}>
            <LinearGradient
              colors={["rgba(0,0,0,0.4)", "transparent"]}
              style={styles.gradiant}
            >
              <ScrollView>
                <Input
                  id="email"
                  label="E-mail"
                  keyboardType="email-address"
                  required
                  email
                  autoCapitalize="none"
                  errorMessage="Please enter a valid email address"
                  onInputChange={() => {}}
                  initialValue=""
                />
                <Input
                  id="password"
                  label="Password"
                  keyboardType="default"
                  secureTextEntry
                  required
                  minLength={6}
                  autoCapitalize="none"
                  errorMessage="Please enter a valid password"
                  onInputChange={() => {}}
                  initialValue=""
                />
                <Spacer position="top" size="xxxl" />
                <BodyButton
                  title="Login"
                  color={theme.colors.brand.muted}
                  mode="outlined"
                  onNavi={() => {}}
                />
                <Spacer position="top" size="large" />
                <BodyButton
                  title="SignUp"
                  color={theme.colors.brand.muted}
                  mode="outlined"
                  onNavi={() => {}}
                />
              </ScrollView>
            </LinearGradient>
          </Card>
        </KeyboardAvoidingView>
      </AccountCover>
    </AccountBackground>
  );
};

const styles = StyleSheet.create({
  screenContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  authScreenContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    backgroundColor: "#87CEFA",
  },
  gradiant: {
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
  },
});
