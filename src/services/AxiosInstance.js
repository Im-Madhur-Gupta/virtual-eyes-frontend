import axios from "axios";
import getFromSecureStore from "../utils/getFromSecureStore";

const AxiosInstance = axios.create({
  //   baseURL: "https://virtual-eyes-backend.azurewebsites.net",
  baseURL: "https://virtual-eyes-backend.herokuapp.com/",
});

AxiosInstance.interceptors.request.use(async (req) => {
  const token = await getFromSecureStore("token");
  req.headers["x-access-token"] = token;
  return req;
});

export default AxiosInstance;
