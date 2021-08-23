import axios from "@apiHelpers/axios";
import { EntityGroup, EntitySearchedGroup } from "@apiHelpers/types";
import { axiosErrorHandler, cacheMap } from "@apiHelpers/apiUtils";
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
      // getAll route for groups is perfect example for using caching
      // since groups created by user don't change
      let url = `/groups?page=${page}`;
      if (cacheMap[url]) return cacheMap[url];
      const response = await axios.get(url);
      // console.log(response.data);
      cacheMap[url] = response.data;
      return response.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
  getOne: async (
    groupid: string
  ): Promise<{ error: boolean; group: EntityGroup } | undefined> => {
    try {
      const response = await axios.get(`/groups/${groupid}`);

      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
  getBySearch: async (
    str: string
  ): Promise<
    | {
        error: boolean;
        results: EntitySearchedGroup[];
      }
    | undefined
  > => {
    try {
      let url = `/groups/search?str=${str}`;

      const response = await axios.get(url);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
};
export default groupsApi;
