import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AddFace from "./AddFace";
import FindFaces from "./FindFaces";

const Tab = createMaterialTopTabNavigator();

const MatchFace = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="AddFace" component={AddFace} />
      <Tab.Screen name="FindFaces" component={FindFaces} />
    </Tab.Navigator>
  );
};

export default MatchFace;
