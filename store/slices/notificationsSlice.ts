import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
interface SliceNotificationsType {
  showNotificationsBox: boolean;
  unseenNotificationsExist: boolean;
}
const initialState: SliceNotificationsType = {
  showNotificationsBox: false,
  unseenNotificationsExist: false,
};
export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setShowNotificationsBox: (
      state,
      action: PayloadAction<{ showNotificationsBox: boolean }>
    ) => {
      state.showNotificationsBox = action.payload.showNotificationsBox;
    },
    setUnseenNotificationsExist: (state, action: PayloadAction<boolean>) => {
      state.unseenNotificationsExist = action.payload;
    },
  },
});
export const { setShowNotificationsBox, setUnseenNotificationsExist } =
  notificationsSlice.actions;
// store.getState().notifications.showNotificationsBox,
// we can get the state like this
export default notificationsSlice.reducer;
