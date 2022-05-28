import create from "zustand";
import saveInSecureStore from "../utils/saveInSecureStore";

// using immer to make sure I am not mutating the state while I am assigning it some value.
import produce from "immer";
import deleteFromSecureStore from "../utils/deleteFromSecureStore";

const initialState = {
  isLoggedIn: null,
  email: null,
  name: null,
  detectedFaces: [],
};

// Note - Here, immer is only needed for the setDetectedFaces action as its an array of nested objects.

const useStore = create((set) => ({
  ...initialState,
  logIn: async (token, userDetails) => {
    // storing the token and user details in Secure Store
    await saveInSecureStore("token", token);
    await saveInSecureStore("user-details", JSON.stringify(userDetails));
    set({ ...userDetails, isLoggedIn: true });
  },
  logOut: async () => {
    await deleteFromSecureStore("token");
    await deleteFromSecureStore("user-details");
    set({ ...initialState, isLoggedIn: false });
  },
  setDetectedFaces: (faces) => {
    set(
      produce((state) => {
        state.detectedFaces = faces;
      })
    );
  },
}));

export default useStore;
