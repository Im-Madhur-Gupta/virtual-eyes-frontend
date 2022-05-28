import { createStackNavigator } from "@react-navigation/stack";

import Onboard from "../Onboard";
import Login from "../Login";
import Signup from "../Signup";

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <>
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Onboard" component={Onboard} />
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Signup" component={Signup} />
      </AuthStack.Navigator>
    </>
  );
};

export default AuthNavigator;
