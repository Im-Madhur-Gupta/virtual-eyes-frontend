import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import DescribeImage from "./src/components/DescribeImage";

export default function App() {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "lightblue",
          fontSize: 50,
          padding: 10,
        }}
      >
        Virtual Eyes
      </Text>
      <DescribeImage />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
