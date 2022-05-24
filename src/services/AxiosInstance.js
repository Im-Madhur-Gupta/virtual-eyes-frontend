import * as SecureStore from "expo-secure-store";
import axios from "axios";

const axiosInstance = axios.create({
  //   baseURL: "https://virtual-eyes-backend.azurewebsites.net",
  baseURL: "https://virtual-eyes-backend.herokuapp.com/",
});

axiosInstance.interceptors.request.use(async (req) => {
  const token = await SecureStore.getItemAsync("token");
  req.headers["x-access-token"] = token;
  return req;
});

export default axiosInstance;
