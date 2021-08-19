import { Image } from "react-native";
import React from "react";

import Onboarding from "react-native-onboarding-swiper"; // 1.1.4

export const OnboardingScreen = () => {
  return (
    <Onboarding
      pages={[
        {
          backgroundColor: "#fff",
          image: <Image source={require("../../../../assets/icon.png")} />,
          title: "Onboarding",
          subtitle: "Done with React Native Onboarding Swiper",
        },
        {
          backgroundColor: "#fe6e58",
          image: <Image source={require("../../../../assets/splash.png")} />,
          title: "The Title",
          subtitle: "This is the subtitle that sumplements the title.",
        },
        {
          backgroundColor: "#999",
          image: <Image source={require("../../../../assets/splash.png")} />,
          title: "Triangle",
          subtitle: "Beautiful, isn't it?",
        },
      ]}
    />
  );
};
