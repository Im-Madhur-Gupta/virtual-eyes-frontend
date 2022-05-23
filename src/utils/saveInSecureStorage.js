import * as SecureStore from "expo-secure-store";

const saveInSecureStorage = async (key, value) => {
  await SecureStore.setItemAsync(key, value);
};

export default saveInSecureStorage;
