import axios from "@apiHelpers/axios";
import { EntityLoop } from "@apiHelpers/types";
import { axiosErrorHandler } from "@apiHelpers/utils";
export default {
  getMe: async (): Promise<
    | {
        error: string;
        user: {
          email: string;
        };
      }
    | undefined
  > => {
    // console.log(process.env.NEXT_PUBLIC_API_URL);

    try {
      const response = await axios.get(`/users/me`);

      // console.log(response.data);
      return response.data;
    } catch (error) {
      axiosErrorHandler(error);
    }
  },
  create: async (user: {
    name: string;
    email: string;
    password: string;
  }): Promise<
    | {
        user: {
          isFirstTime: boolean;
          name: string;
          email: string;
        };
      }
    | undefined
  > => {
    try {
      // console.log("get all");
      // console.log(Cookies.get("token"));
      const response = await axios.post(`/users`, user);

      // console.log(response.data);
      return response.data;
    } catch (error) {
      axiosErrorHandler(error);
    }
  },
  verify: async ({ email }: { email: string }): Promise<string | undefined> => {
    try {
      const response = await axios.post("/users/me/verify", { email });
      return response.data;
    } catch (error) {
      axiosErrorHandler(error);
    }
  },
};
