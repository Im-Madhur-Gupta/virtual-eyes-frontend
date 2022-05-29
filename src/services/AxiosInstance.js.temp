import axios from "axios";
import getFromSecureStore from "../utils/getFromSecureStore";

const axiosInstance = axios.create({
  baseURL: "https://virtual-eyes-prod-backend.azurewebsites.net/",
  // baseURL: "https://virtual-eyes-backend.herokuapp.com/",
});

axiosInstance.interceptors.request.use(async (req) => {
  const token = await getFromSecureStore("token");
  req.headers["x-access-token"] = token;
  return req;
});

export default axiosInstance;
