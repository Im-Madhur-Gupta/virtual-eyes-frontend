import React from "react";
import LottieView from "lottie-react-native";

const Animation = ({ style, source, loop }) => {
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
