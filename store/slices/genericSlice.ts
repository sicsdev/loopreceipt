import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store from "@store/store";

interface SliceGenericType {
  showMobileSideBar: boolean;
}
const initialState: SliceGenericType = {
  showMobileSideBar: false,
};
export const genericSlice = createSlice({
  name: "generic",
  initialState,
  reducers: {
    setShowMobileSideBar: (state, action: PayloadAction<boolean>) => {
      state.showMobileSideBar = action.payload;
    },
  },
});

export const { setShowMobileSideBar } = genericSlice.actions;

export default genericSlice.reducer;
