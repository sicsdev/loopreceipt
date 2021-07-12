import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: {
  name: "light" | "dark";
} = {
  name: "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState>
    ) => {
      state.name = action.payload.name;
    },
  },
});

// Selectors
export const getTheme = (state: RootState) => state.theme;

// Reducers and actions
export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
