import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
export default async function (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET": {
      res.json({
        message: "success",
      });
      break;
    }
    case "POST": {
      try {
        const response = await axios.post(
          `${process.env.API_URL}/api/loops`,
          req.body,
          {
            headers: {
              "x-auth-token": req.headers["x-auth-token"],
            },
          }
        );
        console.log(response.data.error);
        res.json(response.data);
      } catch (err) {
        console.log("Error!!!!!!!!!");
        console.log(err.response?.data?.message);
        // console.log("Error: " + (err?.response?.data?.message || err));
        res.json({
          error: true,
        });
      }
      break;
    }
  }
}
