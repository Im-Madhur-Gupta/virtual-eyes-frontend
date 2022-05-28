import React, { useEffect } from "react";
import { LayoutAnimation, StyleSheet, View } from "react-native";
import Animation from "../Animation";

const LoadingSpinner = ({ accessibilityLabel }) => {
  useEffect(() => {
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
    }, 3000);
  }, []);

  return (
    <View style={styles.container} accessibilityLabel={accessibilityLabel}>
      <Animation
        accessibilityLabel={accessibilityLabel}
        source={require("../../assets/animations/loading-spinner.json")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingSpinner;
