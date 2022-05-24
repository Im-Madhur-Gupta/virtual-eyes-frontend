import { Heading } from "native-base";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AddFace from "./AddFace";
import FindFaces from "./FindFaces";

const Tab = createMaterialTopTabNavigator();

const MatchFace = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Add Face" component={AddFace} />
      <Tab.Screen name="Find Faces" component={FindFaces} />
    </Tab.Navigator>
  );
};

export default MatchFace;
