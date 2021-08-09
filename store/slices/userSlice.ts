import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import store, { RootState } from "../store";
import Cookies from "js-cookie";
import router from "next/router";
import { EntityUser } from "@apiHelpers/types";
const initialState: {
  user?: EntityUser;
} = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<EntityUser>) => {
      state.user = action.payload;
    },
    deleteUser: (state) => {
      state.user = undefined;
    },
  },
});

// Selectors
// export const getUser = (state: RootState) => state.user;
export const logoutUser = () => {
  store.dispatch(deleteUser());
  Cookies.remove("token");
  router.push("/user/login");
};
// Reducers and actions
export const { setUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
