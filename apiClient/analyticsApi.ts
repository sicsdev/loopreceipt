import axios from "@apiHelpers/axios";
import { EntityLoop } from "@apiHelpers/types";
import { axiosErrorHandler, cacheMap } from "@apiHelpers/apiUtils";
import { LoopSource } from "@interfaces/LoopTypes";

const analyticsApi = {
  commentsReceived: async (range: any) => {
    try {
      const response = await axios.get(`/analytics/comments/${range}`);

      return response?.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
  loopsTypes: async (range: any) => {
    try {
      const response = await axios.get(`/analytics/loop/types/${range}`);

      return response?.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
  packagesSentReceived: async (range: any) => {
    try {
      const response = await axios.get(
        `/analytics/packages/sent/received/${range}`
      );

      return response?.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
  packagesMode: async (range: any) => {
    try {
      const response = await axios.get(`/analytics/packages/mode/${range}`);

      return response?.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
};
export default analyticsApi;
