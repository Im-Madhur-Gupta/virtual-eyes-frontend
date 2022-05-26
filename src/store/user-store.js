import create from "zustand";

const initialState = {
  isLoggedIn: false,
  email: null,
  first_name: null,
  last_name: null,
  // Using normailized representation of detectedFacesData instead of a simple array
  // to improve performance while adding facename attribute to a particular face
  detectedFaces: {
    allIds: [],
    byId: {},
  },
};

const useStore = create((set) => ({
  ...initialState,
  logIn: (email, first_name, last_name) =>
    set({ isLoggedIn: true, email, first_name, last_name }),
  logOut: () => set({ ...initialState }),
  setDetectedFaces: (faces) => {
    const parsedDetectedFaces = {
      allIds: [],
      byId: {},
    };

    faces.forEach((face) => {
      parsedDetectedFaces.allIds.push(face.faceId);
      parsedDetectedFaces.byId[face.faceId] = { ...face };
    });

    set({ detectedFaces: parsedDetectedFaces });
  },
  clearDetectedFaces: () =>
    set({
      detectedFaces: {
        allIds: [],
        byId: {},
      },
    }),
}));

export default useStore;
