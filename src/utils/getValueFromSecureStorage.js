import * as SecureStore from "expo-secure-store";

async function getValueFromSecureStorage(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    console.log("🔐 Here's your value 🔐 \n" + result);
  } else {
    console.log("No values stored under that key.");
  }
}

export default getValueFromSecureStorage;
