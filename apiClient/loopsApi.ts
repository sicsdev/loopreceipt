import axios from "@apiHelpers/axios";
import { EntityLoop } from "@apiHelpers/types";
import { axiosErrorHandler, cacheMap } from "@apiHelpers/apiUtils";
import { LoopSource } from "@interfaces/LoopTypes";
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
      throw axiosErrorHandler(error);
    }
  },
  getAll: async (
    page: number = 1,
    filters?: {
      type: LoopSource;
      from: Date;
      to: Date;
    }
  ): Promise<{ loops: EntityLoop[]; totalLoops: number } | undefined> => {
    try {
      // console.log("get all");
      // console.log(Cookies.get("token"));
      // Sample queries - /api/loops?page=1&filter=date&from=1609775390&to=1628092190
      // /api/loops?page=1&filter=type&type=internal
      let url = `/loops?page=${page}`;
      if (filters) {
        if (filters.type) {
          url = `/loops?page=${page}&filter=type&type=${filters.type}`;
        } else if (filters.from && filters.to) {
          url = `/loops?page=${page}&filter=date&from=${filters.from}&to=${filters.to}`;
        }
      }
      // console.log(url);
      if (cacheMap[url]) {
        return cacheMap[url];
      }
      // currently we don't have option for adding multiple filters
      const response = await axios.get(url);
      cacheMap[url] = response.data;
      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
};
