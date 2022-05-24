import * as SecureStore from "expo-secure-store";
import axios from "axios";

const AxiosInstance = axios.create({
  //   baseURL: "https://virtual-eyes-backend.azurewebsites.net",
  baseURL: "https://virtual-eyes-backend.herokuapp.com/",
});

AxiosInstance.interceptors.request.use(async (req) => {
  const token = await SecureStore.getItemAsync("token");
  req.headers["x-access-token"] = token;
  return req;
});

export default AxiosInstance;
