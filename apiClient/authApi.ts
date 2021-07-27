import axios from "./axios";
export default {
  login: async (
    email: string,
    password: string
  ): Promise<{
    token: string;
    isFirstTime: boolean;
  } | null> => {
    try {
      const response = await axios.post(`auth`, { email, password });

      //   console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data.message);
      return null;
    }
  },
};
