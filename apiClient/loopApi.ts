import axios from "axios";
import { EntityLoop } from "./types";
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // console.log(config);
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGY5YjIxZWU0ZjNiZjAwMTUwNzRmZWEiLCJuYW1lIjoic2ljcyIsImVtYWlsIjoic2ljc2RldjIxQGdtYWlsLmNvbSIsImlhdCI6MTYyNzMxMDk1MCwiZXhwIjoxNjI3Mzk3MzUwfQ.mSfipungaAEUkXJMhOhrpj6p5_TQkh354qV3haRB7RU";
    // console.log(config.headers);
    config.headers = {
      ...config.headers,
      "x-auth-token": token,
    };
    // console.log(config.headers);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default {
  createLoop: async (loop: EntityLoop) => {
    // console.log(process.env.NEXT_PUBLIC_API_URL);

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + `/api/loops`,
        loop
      );

      // console.log(response.data);
      return response.data.loop as EntityLoop;
    } catch (error) {
      console.log(error.response.data.message);
    }
  },
};
