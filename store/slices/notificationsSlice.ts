import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import store from "@store/store";
const initialState: {
  showNotificationsBox: boolean;
} = {
  showNotificationsBox: false,
};
export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setShowNotificationsBox: (
      state,
      action: PayloadAction<typeof initialState>
    ) => {
      state.showNotificationsBox = action.payload.showNotificationsBox;
    },
  },
});
export const { setShowNotificationsBox } = notificationsSlice.actions;
// store.getState().notifications.showNotificationsBox,
// we can get the state like this
export default notificationsSlice.reducer;
