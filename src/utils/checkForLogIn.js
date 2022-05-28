import useStore from "../store/user-store";
import getFromSecureStore from "./getFromSecureStore";

const logIn = useStore.getState().logIn;
const logOut = useStore.getState().logOut;

const checkForLogIn = async () => {
  const token = await getFromSecureStore("token");
  const userDetails = await getFromSecureStore("user-details");

  console.log("checkForLogIn func");

  if (token && userDetails) {
    console.log("checkForLogIn func - check passed");
    await logIn(token, JSON.parse(userDetails));
  } else {
    console.log("checkForLogIn func - check failed");
    await logOut();
  }
};

export default checkForLogIn;
