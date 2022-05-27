import "react-native-gesture-handler";
import React from "react";
// import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import Home from "./src/components/Home";
import Login from "./src/components/Login";
import Register from "./src/components/Register";
import Logout from "./src/components/Logout";
import useStore from "./src/store/user-store";
import DescribeImage from "./src/components/VisualizeImage";
import AddFace from "./src/components/AddFace";
import FindFaces from "./src/components/FindFaces";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <Logout closeDrawer={() => props.navigation.closeDrawer()} />
    </DrawerContentScrollView>
  );
};

export default function App() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            tabBarLabelStyle: { textTransform: "none" },
          }}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          useLegacyImplementation={true}
          // useLegacyImplementation={false}
          // screenOptions={{ lazy: false }}
        >
          {isLoggedIn ? (
            <>
              <Drawer.Screen name="Home" component={Home} />
              <Drawer.Screen
                name="VisualizeImage"
                options={{
                  title: "Visualize An Image",
                }}
                component={DescribeImage}
              />
              <Drawer.Screen
                name="AddFace"
                options={{
                  title: "Add Face To My Group",
                }}
                component={AddFace}
              />
              <Drawer.Screen
                name="FindFaces"
                options={{
                  title: "Find Faces From My Group",
                }}
                component={FindFaces}
              />
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
