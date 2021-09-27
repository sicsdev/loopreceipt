import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import store, { RootState } from "../store";
import Cookies from "js-cookie";
import router from "next/router";
import { EntitySubscription } from "@apiHelpers/types";
const initialState: {
  subscription?: EntitySubscription;
} = {};

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setSubscription: (state, action: PayloadAction<EntitySubscription>) => {
      state.subscription = action.payload;
    },
    deleteSubscription: (state) => {
      state.subscription = undefined;
    },
  },
});

// Reducers and actions
export const { setSubscription, deleteSubscription } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
