import useStore from "../store/user-store";
import getFromSecureStore from "./getFromSecureStore";

const logIn = useStore.getState().logIn;
const logOut = useStore.getState().logOut;

const checkForLogIn = async () => {
  const token = await getFromSecureStore("token");
  const userDetails = await getFromSecureStore("user-details");

  console.log("checkforlogin");

  if (token && userDetails) {
    console.log("checkforlogin inside");
    await logIn(token, JSON.parse(userDetails));
  } else {
    await logOut();
  }
};

export default checkForLogIn;
