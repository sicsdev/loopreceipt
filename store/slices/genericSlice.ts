import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store from "@store/store";
import Cookies from "js-cookie";
import router from "next/router";
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
export const logoutUser = () => {
  Cookies.remove("token");
  router.push("/user/login");
};
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
