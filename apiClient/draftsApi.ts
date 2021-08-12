import { axiosErrorHandler, cacheMap } from "@apiHelpers/apiUtils";
import {
  EntityDraft,
  EntityLoop,
  EntityUser,
  LoopFilters,
} from "@apiHelpers/types";
import axios from "@apiHelpers/axios";
import { applyFilters } from "./commonApiFunctions";

const draftsApi = {
  getAll: async (
    page: number = 1,
    filters?: LoopFilters
  ): Promise<{ items: EntityDraft[]; total: number } | undefined> => {
    try {
      // console.log("get all");
      // console.log(Cookies.get("token"));
      // Sample queries - /api/loops?page=1&filter1=date&from=1609775390&to=1628092190
      // /api/loops?page=1&filter1=type&type=internal
      // /api/loops?page=1&filter1=type&type=internal&filter2=date&from=1609775390&to=1628092190

      let url = `/drafts${applyFilters(page, filters)}`;
      console.log(url);

      const response = await axios.get(url);

      // console.log(response.data);
      return {
        items: response.data.drafts,
        total: response.data.totalDrafts,
      };
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
  create: async (
    draft: EntityDraft
  ): Promise<{ error: boolean; draftId: string } | undefined> => {
    // console.log(process.env.NEXT_PUBLIC_API_URL);

    try {
      const response = await axios.post(`/drafts`, draft);

      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
  getOne: async (
    draftId: string
  ): Promise<{ error: boolean; draft: EntityDraft } | undefined> => {
    try {
      const response = await axios.get(`/drafts/${draftId}`);

      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
  update: async (
    draftId: string,
    draft: EntityDraft
  ): Promise<{ error: boolean; draft: EntityDraft } | undefined> => {
    try {
      const response = await axios.put(`/drafts/${draftId}`, draft);

      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
  delete: async (draftId: string): Promise<undefined> => {
    try {
      const response = await axios.delete(`/drafts/${draftId}`);

      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
};
export default draftsApi;
