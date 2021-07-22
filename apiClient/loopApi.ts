import axios from "axios";
import { EntityLoop } from "./types";
export default {
  createLoop: async (loop: EntityLoop) => {
    // console.log(process.env.NEXT_PUBLIC_API_URL);
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGY5YjIxZWU0ZjNiZjAwMTUwNzRmZWEiLCJuYW1lIjoic2ljcyIsImVtYWlsIjoic2ljc2RldjIxQGdtYWlsLmNvbSIsImlhdCI6MTYyNjk3NjkzMiwiZXhwIjoxNjI3MDYzMzMyfQ.P4CDYjITFmd7yoFFz7v-hl45OWCPziYX-WgfsEgR8gA";

    const response = await axios.post(`/api/loops`, loop, {
      headers: {
        "x-auth-token": token,
      },
    });
    if (!response.data.error) {
      return response.data.loop as EntityLoop;
    }
  },
};
