import axios from "@apiHelpers/axios";
import { EntityLoop } from "@apiHelpers/types";
import { axiosErrorHandler, cacheMap } from "@apiHelpers/apiUtils";
import { LoopSource } from "@interfaces/LoopTypes";

export default {
  commentsReceived: async (range) => {
    try {
      const response = await axios.get(`/analytics/comments/${range}`);

      return response?.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
  loopsTypes: async (range) => {
    try {
      const response = await axios.get(`/analytics/loop/types/${range}`);

      return response?.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  }
};
