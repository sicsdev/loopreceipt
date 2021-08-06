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
      // Sample queries - /api/loops?page=1&filter1=date&from=1609775390&to=1628092190
      // /api/loops?page=1&filter1=type&type=internal
      // /api/loops?page=1&filter1=type&type=internal&filter2=date&from=1609775390&to=1628092190
      let url = `/loops?page=${page}`;
      if (filters) {
        if (filters.type && filters.from && filters.to) {
          url += `&filter1=type&type=${filters.type}&filter2=date&from=${filters.from}&to=${filters.to}`;
        } else if (filters.from && filters.to) {
          url += `&filter1=date&from=${filters.from}&to=${filters.to}`;
        } else if (filters.type) {
          url += `&filter1=type&type=${filters.type}`;
        }
      }
      console.log(url);
      if (cacheMap[url]) {
        return cacheMap[url];
      }
      const response = await axios.get(url);
      cacheMap[url] = response.data;
      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
};
