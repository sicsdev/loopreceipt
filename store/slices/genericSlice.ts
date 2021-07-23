import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store from "@store/store";
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
export const openGettingStartedGuide = () => {
  store.dispatch(setShowGettingStartedGuide({ showGettingStartedGuide: true }));
};
export const closeGettingStartedGuide = () => {
  store.dispatch(
    setShowGettingStartedGuide({ showGettingStartedGuide: false })
  );
};

export default genericSlice.reducer;
