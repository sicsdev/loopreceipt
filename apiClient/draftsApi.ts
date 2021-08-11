import { axiosErrorHandler, cacheMap } from "@apiHelpers/apiUtils";
import { EntityDraft, EntityLoop, EntityUser } from "@apiHelpers/types";
import axios from "@apiHelpers/axios";

const draftsApi = {
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
