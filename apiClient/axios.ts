const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGZlZmQ3Njc0ZjdjMTAwMTVjYjJkZDgiLCJuYW1lIjoicmFodWwiLCJlbWFpbCI6InJhaHVsZ3VwdGFjczFAZ21haWwuY29tIiwiaWF0IjoxNjI3MzIzODU4LCJleHAiOjE2Mjc0MTAyNTh9.v3Q1M9OSLH4skqYk0OsCYTc6I2o4kGTYFejk3IZViSA";
import axios from "axios";
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api/",
  headers: { "x-auth-token": token },
});
export default instance;
