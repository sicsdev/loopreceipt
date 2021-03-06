import axios from "@apiHelpers/axios";
import { EntityLoop, EntityUser, ErrorResponse } from "@apiHelpers/types";
import { axiosErrorHandler } from "@apiHelpers/apiUtils";

const usersApi = {
  getMe: async (): Promise<{
    user: EntityUser;
  }> => {
    // console.log(process.env.NEXT_PUBLIC_API_URL);

    try {
      const response = await axios.get(`/users/me`);

      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw axiosErrorHandler(error);
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
      console.log("create usersApi called");
      // console.log(Cookies.get("token"));
      const response = await axios.post(`/users`, user);

      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
  updateUser: async (user: {
    name?: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    company?: string;
    profileImage?: string;
    address?: string;
    industry?: string;
  }): Promise<ErrorResponse> => {
    try {
      // console.log(Cookies.get("token"));
      const response = await axios.put(`/users/me`, user);

      // console.log(response.data);
      return response.data;
    } catch (error) {
      // return error?.response?.data;
      throw axiosErrorHandler(error);
    }
  },
  sendVerificationLink: async ({
    email,
  }: {
    email: string;
  }): Promise<string | ErrorResponse | undefined> => {
    try {
      const response = await axios.post("/users/me/verify", { email });
      return response.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
  forgot: async ({ email }: { email: string }): Promise<string | undefined> => {
    try {
      const response = await axios.post("/users/forgot", { email });
      return response.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
  passwordUpdate: async (payload: {
    newPassword: string;
    confirmPassword: string;
    currentPassword: string;
  }): Promise<ErrorResponse | undefined> => {
    try {
      const response = await axios.put("/users/password/update", payload);
      return response.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
  passwordReset: async (payload: {
    token: string;
    newPassword: string;
    confirmPassword: string;
    location: string;
    browser: string;
    os: string;
    date: string;
  }): Promise<{ error: boolean; message: string } | undefined> => {
    try {
      const response = await axios.post("/users/reset", payload);
      return response.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
  validateResetPasswordToken: async (token: string) => {
    try {
      const response = await axios.get(`/users/reset/validate?token=${token}`);
      return response.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
  verifyUser: async (payload: {
    userid: string;
    token: string;
  }): Promise<{ error: boolean; message?: string } | undefined> => {
    // /api/users/:userid/verify/:token
    // console.log(payload);
    // return;
    try {
      const response = await axios.get(
        `/users/${payload.userid}/verify/${payload.token}`
      );
      return response.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
  checkVerificationStatus: async (
    email: string
  ): Promise<{ error: boolean; isVerified: boolean } | undefined> => {
    try {
      const response = await axios.post(`/users/verification/check`, { email });
      return response.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
  getContacts: async (): Promise<
    { error: boolean; contacts: any[] } | undefined
  > => {
    try {
      const response = await axios.get(`/users/contacts`);
      return response.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
  deleteAccount: async (): Promise<
    { error: boolean; message: string } | undefined
  > => {
    try {
      const response = await axios.delete("/users/me");
      return response.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
};
export default usersApi;
