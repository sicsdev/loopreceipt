import axios from "@apiHelpers/axios";
import { EntityGroup } from "@apiHelpers/types";
import { axiosErrorHandler } from "@apiHelpers/apiUtils";
const groupsApi = {
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
  update: async ({
    group,
    groupid,
  }: {
    group: EntityGroup;
    groupid: string;
  }): Promise<
    | {
        group: EntityGroup;
      }
    | undefined
  > => {
    try {
      const response = await axios.put(`/groups/${groupid}`, group);

      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
  getAll: async (
    page: number
  ): Promise<
    | {
        error: boolean;
        total: number;
        groups: EntityGroup[];
      }
    | undefined
  > => {
    try {
      let url = `/groups?page=${page}`;

      const response = await axios.get(url);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
};
export default groupsApi;
