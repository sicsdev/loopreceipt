import axios from "@apiHelpers/axios";
import { axiosErrorHandler } from "@apiHelpers/utils";
export default {
  login: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<
    | {
        token: string;
        isFirstTime: boolean;
      }
    | undefined
  > => {
    try {
      const response = await axios.post(`/auth`, { email, password });

      //   console.log(response.data);
      return response.data;
    } catch (error) {
      axiosErrorHandler(error);
    }
  },
};
