import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AddMultipleFacesFromImage from "./AddMultipleFacesFromImage";
import AddSingleFaceFromImages from "./AddSingleFaceFromImages";

const Tab = createMaterialTopTabNavigator();

const AddFace = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: false,
        tabBarLabelStyle: { textTransform: "none" },
      }}
    >
      <Tab.Screen
        name="AddSingleFaceFromImages"
        options={{
          title: "Add Single Person",
        }}
        component={AddSingleFaceFromImages}
      />
      <Tab.Screen
        name="AddMultipleFacesFromImage"
        options={{ title: "Add Multiple People" }}
        component={AddMultipleFacesFromImage}
      />
    </Tab.Navigator>
  );
};

export default AddFace;
