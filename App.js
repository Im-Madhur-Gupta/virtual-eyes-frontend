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
import MatchFace from "./src/components/MatchFace";
import DescribeImage from "./src/components/DescribeImage";

const Drawer = createDrawerNavigator();

export default function App() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Drawer.Navigator
          // initialRouteName={isLoggedIn ? "Home" : "Login"}
          useLegacyImplementation={false}
          screenOptions={{ lazy: false }}
        >
          {isLoggedIn ? (
            <>
              <Drawer.Screen name="Home" component={Home} />
              <Drawer.Screen name="MatchFace" component={MatchFace} />
              <Drawer.Screen name="DescribeImage" component={DescribeImage} />
            </>
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
