import create from "zustand";

// using immer to make sure I am not mutating the state while I am assigning it some value.
import produce from "immer";

const initialState = {
  isLoggedIn: false,
  email: null,
  first_name: null,
  last_name: null,
  detectedFaces: [],
};

// Note - Here, immer is only needed for the setDetectedFaces action.

const useStore = create((set) => ({
  ...initialState,
  logIn: (email, first_name, last_name) =>
    set({ isLoggedIn: true, email, first_name, last_name }),
  logOut: () => set({ ...initialState }),
  setDetectedFaces: (faces) => {
    set(
      produce((state) => {
        state.detectedFaces = faces;
      })
    );
  },
}));

export default useStore;
