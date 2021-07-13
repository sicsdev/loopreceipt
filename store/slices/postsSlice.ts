import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// https://jsonplaceholder.typicode.com/posts
export interface PostType {
  userId: number;
  id: number;
  title: string;
  body: string;
}
const initialState: {
  posts: PostType[];
  status: "idle" | "loading";
} = {
  posts: [],
  status: "idle",
};
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  // The value we return becomes the `fulfilled` action payload
  const data = await response.json();
  return data;
});
export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "idle";
        state.posts = action.payload;
      });
  },
});
export default postsSlice.reducer;
