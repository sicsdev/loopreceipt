import axios from "./axios";
import { EntityGroup } from "./types";

export default {
  create: async (group: EntityGroup) => {
    try {
      const response = await axios.post(`groups`, group);

      // console.log(response.data);
      return response.data.group as EntityGroup;
    } catch (error) {
      console.log(error.response.data.message);
      return null;
    }
  },
  getAll: async () => {
    try {
      const response = await axios.get(`groups`);

      //   console.log(response.data);
      return response.data.groups as EntityGroup[];
    } catch (error) {
      console.log(error.response.data.message);
      return [];
    }
  },
};
