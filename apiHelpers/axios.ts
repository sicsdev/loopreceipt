import axios from "axios";
import Cookies from "js-cookie";
import router from "next/router";
export const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";
const instance = axios.create({
  baseURL,
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
instance.interceptors.response.use(
  (response) => {
    // console.log(response);
    return response;
  },
  (error) => {
    // console.log(error.response.data);
    if (error.response.data.message === "Access denied no token provided.") {
      router.push("/user/login");
    }
    return Promise.reject(error);
  }
);

export default instance;
