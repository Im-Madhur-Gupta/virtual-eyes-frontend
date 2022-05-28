import React, { useEffect } from "react";
import {
  LayoutAnimation,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import Animation from "../Animation";

import useStore from "../../store/user-store";

const LoadingSpinner = ({ accessibilityLabel = "Loading" }) => {
  const { height, width } = useWindowDimensions();
  const isLoading = useStore((state) => state.isLoading);

  useEffect(() => {
    const id = setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
    }, 3000);
    return () => clearTimeout(id);
  }, []);

  return (
    <View
      width={width}
      height={height}
      style={styles.container}
      display={isLoading ? "flex" : "none"}
      accessibilityLabel={accessibilityLabel}
    >
      <Animation
        accessibilityLabel={accessibilityLabel}
        source={require("../../assets/animations/loading-spinner.json")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    // zIndex: 99999,
  },
});

export default LoadingSpinner;
