import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: {
  id: number | null;
  username: string | null;
} = {
  id: 1,
  username: "benja",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState>
    ) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
    },
    resetUser: (state: Draft<typeof initialState>) => {
      state.id = null;
      state.username = null;
    },
  },
});

// Selectors
export const getUser = (state: RootState) => state.user;

// Reducers and actions
export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
