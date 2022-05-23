import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "./src/components/Home";
import Login from "./src/components/Login";
import Register from "./src/components/Register";
import useStore from "./src/store/user-store";

const Drawer = createDrawerNavigator();

export default function App() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Drawer.Navigator>
          {isLoggedIn ? (
            <Drawer.Screen name="Home" component={Home} />
          ) : (
            <>
              <Drawer.Screen name="Login" component={Login} />
              <Drawer.Screen name="Register" component={Register} />
            </>
          )}
        </Drawer.Navigator>
        {/* <StatusBar style="auto" /> */}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
