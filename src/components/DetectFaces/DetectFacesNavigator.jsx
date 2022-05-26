import { createStackNavigator } from "@react-navigation/stack";
import DetectFaces from "./DetectFaces";
import ViewDetectedFaces from "./ViewDetectedFaces";

const Stack = createStackNavigator();

const DetectFacesNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DetectFaces" component={DetectFaces} />
      <Stack.Screen name="ViewDetectedFaces" component={ViewDetectedFaces} />
    </Stack.Navigator>
  );
};

export default DetectFacesNavigator;
