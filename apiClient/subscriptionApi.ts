import axios from "@apiHelpers/axios";
import { EntityLoop, EntityUser, ErrorResponse } from "@apiHelpers/types";
import { axiosErrorHandler } from "@apiHelpers/apiUtils";

const subscriptionApi = {
  create: async (subscribeDetails: {
    priceId: string;
    memberCount: string | number;
  }): Promise<
     {
        client_secret: string;
        status: string;
        error: boolean
      }
    
  > => {
    try {
      const response = await axios.post(`/subscribe`, subscribeDetails);

      return response.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
  getDetails: async ({email}: any) => {
    try {
      let config = {
        headers: {
          email,
        }
      }
      const response = await axios.get(`/subscribe/details`, config);

      return response.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
  getPaymentHistory: async (customerId?:string) => {
    try {
      const response = await axios.get(`/subscribe/payments/${customerId}`);

      return response.data;
    } catch (error) {
      throw axiosErrorHandler(error);
    }
  },
  updateSubscriptionPlan: async (subscriptionUpdateObj: {
    subscriptionId?: string;
    data?: {
      price?: string;
      quantity?: number | string;
    },
  }): Promise<ErrorResponse> => {
    try {
      // console.log(Cookies.get("token"));
      const response = await axios.patch(`/subscribe/plan`, subscriptionUpdateObj);

      // console.log(response.data);
      return response.data;
    } catch (error) {
      // return error?.response?.data;
      throw axiosErrorHandler(error);
    }
  },
  updateSubscriptionDetails: async (paymentMethodId: string): Promise<ErrorResponse> => {
    try {
      // console.log(Cookies.get("token"));
      const response = await axios.patch(`/subscribe/details`, {paymentMethodId});

      // console.log(response.data);
      return response.data;
    } catch (error) {
      // return error?.response?.data;
      throw axiosErrorHandler(error);
    }
  },
};
export default subscriptionApi;
