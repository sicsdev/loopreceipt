import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store from "@store/store";
type AlertSeverityTypes = "error" | "warning" | "info" | "success";
interface SliceGenericType {
  showMobileSideBar: boolean;
  showAlert: boolean;
  alertMessage: string | JSX.Element;
  alertSeverity: AlertSeverityTypes;
  alertLink?: {
    type: AlertSeverityTypes;
    href: string;
    text: string;
  };
}

const initialState: SliceGenericType = {
  showMobileSideBar: false,
  showAlert: false,
  alertMessage: "",
  alertSeverity: "success",
};
export const genericSlice = createSlice({
  name: "generic",
  initialState,
  reducers: {
    setShowMobileSideBar: (state, action: PayloadAction<boolean>) => {
      state.showMobileSideBar = action.payload;
    },
    setShowAlert: (state, action: PayloadAction<boolean>) => {
      state.showAlert = action.payload;
    },
    setAlertMessage: (
      state,
      action: PayloadAction<SliceGenericType["alertMessage"]>
    ) => {
      state.alertMessage = action.payload;
    },
    setAlertLink: (
      state,
      action: PayloadAction<SliceGenericType["alertLink"]>
    ) => {
      state.alertLink = action.payload;
    },
    setAlertSeverity: (
      state,
      action: PayloadAction<SliceGenericType["alertSeverity"]>
    ) => {
      state.alertSeverity = action.payload;
    },
  },
});
export const raiseAlert = (
  alertMessage: string | JSX.Element,
  alertSeverity: SliceGenericType["alertSeverity"],
  alertLink?: {
    type: AlertSeverityTypes;
    href: string;
    text: string;
  }
) => {
  store.dispatch(setAlertMessage(alertMessage));
  store.dispatch(setAlertSeverity(alertSeverity));
  if (alertLink) {
    store.dispatch(setAlertLink(alertLink));
  }
  store.dispatch(setShowAlert(true));
};
export const {
  setShowMobileSideBar,
  setShowAlert,
  setAlertMessage,
  setAlertLink,
  setAlertSeverity,
} = genericSlice.actions;

export default genericSlice.reducer;
