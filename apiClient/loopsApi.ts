import axios from "@apiHelpers/axios";
import { EntityLoop } from "@apiHelpers/types";
import { axiosErrorHandler } from "@apiHelpers/utils";
import Cookies from "js-cookie";
export default {
  create: async (
    loop: EntityLoop
  ): Promise<{ loop: EntityLoop } | undefined> => {
    // console.log(process.env.NEXT_PUBLIC_API_URL);

    try {
      const response = await axios.post(`/loops`, loop);

      // console.log(response.data);
      return response.data;
    } catch (error) {
      axiosErrorHandler(error);
    }
  },
  getAll: async (): Promise<{ loops: EntityLoop[] } | undefined> => {
    try {
      // console.log("get all");
      // console.log(Cookies.get("token"));
      const response = await axios.get(`/loops`);

      // console.log(response.data);
      return response.data;
    } catch (error) {
      axiosErrorHandler(error);
    }
  },
};
