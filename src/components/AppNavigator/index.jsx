import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import Home from "../Home";
import VisualizeImage from "../VisualizeImage";
import AddFace from "../AddFace";
import FindFaces from "../FindFaces";
import LogoutButton from "../LogoutButton";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <LogoutButton closeDrawer={() => props.navigation.closeDrawer()} />
    </DrawerContentScrollView>
  );
};

const AppNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        tabBarLabelStyle: { textTransform: "none" },
        drawerStyle: {
          paddingTop: 30,
          width: "80%",
        },
        drawerLabelStyle: {
          fontSize: 18,
        },
        headerTitleStyle: {
          fontSize: 21,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      useLegacyImplementation={true}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen
        name="VisualizeImage"
        options={{
          title: "Visualize an Image",
        }}
        component={VisualizeImage}
      />
      <Drawer.Screen
        name="AddFace"
        options={{
          title: "Add People To My Group",
        }}
        component={AddFace}
      />
      <Drawer.Screen
        name="FindFaces"
        options={{
          title: "Find People in an Image",
        }}
        component={FindFaces}
      />
    </Drawer.Navigator>
  );
};

export default AppNavigator;
