import axios from "axios";

const axiosInstance = axios.create({
  //   baseURL: "https://virtual-eyes-backend.azurewebsites.net",
  baseURL: "https://virtual-eyes-backend.herokuapp.com/",
});

export default axiosInstance;
