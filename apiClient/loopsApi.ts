import axios from "@apiHelpers/axios";
import { EntityLoop, LoopFilters } from "@apiHelpers/types";
import { axiosErrorHandler, cacheMap } from "@apiHelpers/apiUtils";
import { LoopSource } from "@interfaces/LoopTypes";
import Cookies from "js-cookie";
import { applyFilters } from "./commonApiFunctions";
const loopsApi = {
  create: async (
    loop: EntityLoop
  ): Promise<{ loop: EntityLoop } | undefined> => {
    // console.log(process.env.NEXT_PUBLIC_API_URL);

    try {
      const response = await axios.post(`/loops`, loop);

      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
  getAll: async (
    page: number = 1,
    filters?: LoopFilters
  ): Promise<{ items: EntityLoop[]; total: number } | undefined> => {
    try {
      // console.log("get all");
      // console.log(Cookies.get("token"));
      // Sample queries - /api/loops?page=1&filter1=date&from=1609775390&to=1628092190
      // /api/loops?page=1&filter1=type&type=internal
      // /api/loops?page=1&filter1=type&type=internal&filter2=date&from=1609775390&to=1628092190

      let url = `/loops${applyFilters(page, filters)}`;
      console.log(url);

      const response = await axios.get(url);

      // console.log(response.data);
      return {
        items: response.data.loops,
        total: response.data.totalLoops,
      };
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
};
export default loopsApi;
