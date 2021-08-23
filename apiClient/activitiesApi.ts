import axios from "@apiHelpers/axios";
import { axiosErrorHandler } from "@apiHelpers/apiUtils";
import { EntityActivity } from "@apiHelpers/types";

const activitiesApi = {
  getAll: async (): Promise<
    { error: boolean; activities: EntityActivity[] } | undefined
  > => {
    try {
      const response = await axios.get("/users/activity");

      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
  markAsSeen: async (activityId: string) => {
    try {
      const response = await axios.patch("/users/activity/seen", {
        activityId,
      });

      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
  delete: async (activityId: string) => {
    try {
      const response = await axios.post("/users/activity/delete", {
        activityId,
      });

      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
};
export default activitiesApi;
