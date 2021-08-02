import axios from "@apiHelpers/axios";
import { EntityGroup } from "@apiHelpers/types";
import { axiosErrorHandler } from "@apiHelpers/apiUtils";
export default {
  create: async (
    group: EntityGroup
  ): Promise<
    | {
        group: EntityGroup;
      }
    | undefined
  > => {
    try {
      const response = await axios.post(`/groups`, group);

      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
  getAll: async () => {
    try {
      const response = await axios.get(`/groups`);

      //   console.log(response.data);
      return response.data as { groups: EntityGroup[] };
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
};
