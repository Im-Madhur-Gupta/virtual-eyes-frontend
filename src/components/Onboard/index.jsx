import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Box, Text } from "native-base";
import Onboarding from "react-native-onboarding-swiper";

import globalStyles from "../../layouts/globalStyleSheet";

import Animation from "../Animation";
import AddFaceSubtitle from "./AddFaceSubtitle";

const styles = StyleSheet.create({
  doneButton: { marginRight: 20, padding: 5 },
  doneText: { fontSize: 18 },
  titleText: {
    fontSize: 26,
    paddingHorizontal: 15,
    paddingVertical: 0,
    marginVertical: 0,
    color: globalStyles.colors.primary,
    fontFamily: "Poppins_700Bold",
  },
  subtitleText: { fontSize: 18, paddingHorizontal: 15 },
  subtitleStepContainer: {
    flexDirection: "row",
    width: "80%",
    height: "auto",
    paddingHorizontal: 15,
    paddingVertical: 6,
  },
  subtitleStepHead: {
    fontSize: 18,
    fontWeight: "500",
    color: globalStyles.colors.primary,
    marginRight: 5,
  },
  subtitleStepText: {
    fontSize: 18,
  },
});

const pages = [
  {
    backgroundColor: globalStyles.colors.primary,
    title: "Welcome to Virtual Eyes",
    subtitle: "A pair of eyes for those who can't see.",
    titleStyles: { color: "#ffffff" },
    image: (
      <Animation
        style={{
          width: 300,
          height: 300,
        }}
        source={require("../../assets/animations/onboarding.json")}
      />
    ),
  },
  {
    backgroundColor: "#ffffff",
    title: "Visualize an Image",
    subtitle: "Select an image and get a text-based description of it.",
    image: (
      <Animation
        style={{
          width: 330,
          height: 330,
        }}
        source={require("../../assets/animations/visualize-image.json")}
      />
    ),
  },
  {
    backgroundColor: "#ffffff",
    title: "Add your Loved Ones to your Group",
    subtitle: <AddFaceSubtitle styles={styles} />,
    image: <Box />,
  },
  {
    backgroundColor: "#ffffff",
    title: "Find People in an Image from your Group",
    subtitle:
      "Select an image and find the people in it who are from your group.",
    image: (
      <Animation source={require("../../assets/animations/find-faces.json")} />
    ),
  },
];

const Onboard = ({ navigation }) => {
  const onDone = () => navigation.navigate("Login");
  const onSkip = () => navigation.replace("Login");

  const DoneButtonComponent = ({ ...props }) => (
    <TouchableOpacity style={styles.doneButton} {...props}>
      <Text style={styles.doneText}>Done</Text>
    </TouchableOpacity>
  );

  return (
    <Onboarding
      transitionAnimationDuration={400}
      titleStyles={styles.titleText}
      subTitleStyles={styles.subtitleText}
      bottomBarHighlight={false}
      bottomBarHeight={80}
      {...{
        pages,
        onDone,
        onSkip,
        DoneButtonComponent,
      }}
    />
  );
};

export default Onboard;
