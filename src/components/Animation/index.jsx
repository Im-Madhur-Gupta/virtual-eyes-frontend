import React, { useEffect } from "react";
import { LayoutAnimation } from "react-native";
import LottieView from "lottie-react-native";

const Animation = ({ style, source, loop }) => {
  useEffect(() => {
    const id = setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
    }, 500);
    return () => clearTimeout(id);
  }, []);
  return <LottieView {...{ style, source, loop }} autoPlay={true} />;
};

Animation.defaultProps = {
  loop: true,
  style: {
    width: 350,
    height: 350,
  },
};

export default Animation;
