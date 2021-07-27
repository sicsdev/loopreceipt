import axios from "./axios";
import { EntityLoop } from "./types";
import Cookies from "js-cookie";
export default {
  create: async (loop: EntityLoop) => {
    // console.log(process.env.NEXT_PUBLIC_API_URL);

    try {
      const response = await axios.post(`loops`, loop);

      // console.log(response.data);
      return response.data.loop as EntityLoop;
    } catch (error) {
      console.log(error.response.data.message);
      return null;
    }
  },
  getAll: async () => {
    try {
      // console.log("get all");
      // console.log(Cookies.get("token"));
      const response = await axios.get(`loops`);

      // console.log(response.data);
      return response.data.loops as EntityLoop[];
    } catch (error) {
      console.log(error.response.data.message);
      return [];
    }
  },
};
