import { createStackNavigator } from "@react-navigation/stack";
import DetectFaces from "./DetectFaces";
import AddFacesToGroup from "./AddFacesToGroup";

const Stack = createStackNavigator();

/**
 * This component will be used to add multiple faces to a Person Group from a single image.
 *
 * It will detect faces from the image and then allow the user to add them to a Person Group based on the generated textual description of the faces.
 *
 * Know more about Azure Face API's Person Group {@link https://docs.microsoft.com/en-in/azure/cognitive-services/face/concepts/face-recognition here}.
 *
 * This component returns a Stack.Navigator component that contains two screens, DetectFaces and AddFacesToGroup.
 * @returns Stack.Navigator
 */
const AddMultipleFacesFromImage = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="DetectFaces" component={DetectFaces} />
      <Stack.Screen name="AddFacesToGroup" component={AddFacesToGroup} />
    </Stack.Navigator>
  );
};

export default AddMultipleFacesFromImage;
