import * as SecureStore from "expo-secure-store";

const getFromSecureStore = async (key) => {
  const value = await SecureStore.getItemAsync(key);
  return value;
};

export default getFromSecureStore;
