import create from "zustand";

const initialState = {
  isLoggedIn: false,
  email: null,
  first_name: null,
  last_name: null,
};

const useStore = create((set) => ({
  ...initialState,
  logIn: (email, first_name, last_name) =>
    set({ isLoggedIn: true, email, first_name, last_name }),
  logOut: () => set({ ...initialState }),
}));

export default useStore;
