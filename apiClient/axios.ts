import axios from "axios";
import Cookies from "js-cookie";
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api/",
});
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // console.log(Cookies.get("token"));
    config.headers["x-auth-token"] = Cookies.get("token") ?? "";
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;
