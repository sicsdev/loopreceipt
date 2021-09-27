import axios from "@apiHelpers/axios";
import { EntityLoop, LoopFilters } from "@apiHelpers/types";
import { axiosErrorHandler, cacheMap } from "@apiHelpers/apiUtils";
import { applyFilters } from "./commonApiFunctions";
const loopsApi = {
  create: async (
    loop: EntityLoop
  ): Promise<{ loop: EntityLoop } | undefined> => {
    try {
      const response = await axios.post(`/loops`, loop);
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
      let url = `/loops/outgoing${applyFilters(page, filters)}`;
      const response = await axios.get(url);
      return {
        items: response.data.loops,
        total: response.data.totalLoops,
      };
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
  getHistory: async (
    page: number = 1,
    filters?: LoopFilters
  ): Promise<{ items: EntityLoop[]; total: number } | undefined> => {
    try {
      let url = `/loops/history${applyFilters(page, filters)}`;

      const response = await axios.get(url);

      return {
        items: response.data.history,
        total: response.data.totalLoops || response.data.history?.length || 0,
      };
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
  getList: async (
    page: number = 1,
    filters?: LoopFilters
  ): Promise<{ items: EntityLoop[]; total: number } | undefined> => {
    try {
      let url = `/loops/received${applyFilters(page, filters)}`;

      const response = await axios.get(url);

      return {
        items: response.data.loops,
        total: response.data.totalLoops,
      };
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
  getLoop: async(loopId: string) => {
    try {
      let url = `/loops/${loopId}`;
      const response = await axios.get(url);
      return response?.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  }
};
export default loopsApi;
