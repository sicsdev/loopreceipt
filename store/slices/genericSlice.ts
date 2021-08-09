import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store from "@store/store";

interface SliceGenericType {
  showGettingStartedGuide: boolean;
  showMobileSideBar: boolean;
}
const initialState: SliceGenericType = {
  showGettingStartedGuide: false,
  showMobileSideBar: false,
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
    setShowMobileSideBar: (state, action: PayloadAction<boolean>) => {
      state.showMobileSideBar = action.payload;
    },
  },
});

export const { setShowGettingStartedGuide, setShowMobileSideBar } =
  genericSlice.actions;
export const openGettingStartedGuide = () => {
  store.dispatch(setShowGettingStartedGuide({ showGettingStartedGuide: true }));
};
export const closeGettingStartedGuide = () => {
  store.dispatch(
    setShowGettingStartedGuide({ showGettingStartedGuide: false })
  );
};

export default genericSlice.reducer;
