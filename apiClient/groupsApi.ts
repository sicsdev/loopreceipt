import axios from "@apiHelpers/axios";
import { EntityGroup } from "@apiHelpers/types";

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
      console.log(error.response.data.message);
    }
  },
  getAll: async (): Promise<{ groups: EntityGroup[] } | undefined> => {
    try {
      const response = await axios.get(`groups`);

      //   console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data.message);
    }
  },
};
