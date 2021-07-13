import axios from "axios";
import { EntityLoop } from "./types";
export default {
  createLoop: async (loop: EntityLoop) => {
    // console.log(process.env.NEXT_PUBLIC_API_URL);
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGVjYmJiNmI5ZmQ5NTAwMTVjYjQ1ZDIiLCJuYW1lIjoicmFodWwiLCJlbWFpbCI6Imd1cHRhcmFodWxAZ21haWwuY29tIiwiaWF0IjoxNjI2MTk1NDYxfQ.kTSgsShJf-8WmG3CNxkx8fpi56ORES-gLYalTfUGb-I";
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/loops`,
        loop,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      return response.data.loop as EntityLoop;
    } catch (err) {
      console.log(err);
    }
  },
};
