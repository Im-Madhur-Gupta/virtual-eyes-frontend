import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import checkForLogIn from "./src/utils/checkForLogIn";
import AppNavigator from "./src/components/AppNavigator";
import AuthNavigator from "./src/components/AuthNavigator";
import LoadingSpinner from "./src/components/LoadingSpinner";
import useStore from "./src/store/user-store";

export default function App() {
  // loading fonts from google fonts
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  const isLoggedIn = useStore((state) => state.isLoggedIn);

  console.log("isLoggedIn", isLoggedIn);

  // check for previous login after the app starts for the first time
  useEffect(() => {
    checkForLogIn();
  }, []);

  // user has just launched the app
  if (!fontsLoaded || isLoggedIn === null) return <LoadingSpinner />;

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <SafeAreaProvider>
          {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
        </SafeAreaProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
