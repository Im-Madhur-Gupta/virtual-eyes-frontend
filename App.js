import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

import DescribeImage from "./src/components/DescribeImage";

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Text>Virtual Eyes</Text>
        <DescribeImage />
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
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
