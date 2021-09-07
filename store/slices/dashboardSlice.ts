import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store from "@store/store";
interface SliceDashboardType {
  showGettingStartedGuide: boolean;
  activeTabIndex: number;
}
const initialState: SliceDashboardType = {
  showGettingStartedGuide: false,
  activeTabIndex: 0,
};
export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setShowGettingStartedGuide: (state, action: PayloadAction<boolean>) => {
      state.showGettingStartedGuide = action.payload;
    },
    setActiveTabIndex: (state, action: PayloadAction<number>) => {
      state.activeTabIndex = action.payload;
    },
  },
});
export const { setShowGettingStartedGuide, setActiveTabIndex } =
  dashboardSlice.actions;

export const openGettingStartedGuide = () => {
  store.dispatch(setShowGettingStartedGuide(true));
};
export const closeGettingStartedGuide = () => {
  store.dispatch(setShowGettingStartedGuide(false));
};

export default dashboardSlice.reducer;
