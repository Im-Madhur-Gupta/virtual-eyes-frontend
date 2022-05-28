import * as SecureStore from "expo-secure-store";

const deleteFromSecureStore = async (key) => {
  await SecureStore.deleteItemAsync(key);
};

export default deleteFromSecureStore;
