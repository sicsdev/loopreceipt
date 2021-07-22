import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface SliceGenericType {
  showGettingStartedGuide: boolean;
}
const initialState: SliceGenericType = {
  showGettingStartedGuide: false,
};
export const genericSlice = createSlice({
  name: "generic",
  initialState,
  reducers: {
    setShowGettingStartedGuide: (
      state,
      action: PayloadAction<{ showGettingStartedGuide: boolean }>
    ) => {
      state.showGettingStartedGuide = action.payload.showGettingStartedGuide;
    },
  },
});
export const { setShowGettingStartedGuide } = genericSlice.actions;
export default genericSlice.reducer;
