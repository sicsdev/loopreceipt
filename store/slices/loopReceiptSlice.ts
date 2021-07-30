import { EntityLooper } from "apiHelpers/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
interface SliceLoopReceiptType {
  type: "internal" | "external";
  addRecepientManually: boolean;
}
const initialState: SliceLoopReceiptType = {
  type: "internal",
  addRecepientManually: false,
};

export const loopReceiptSlice = createSlice({
  name: "loopReceipt",
  initialState,
  reducers: {
    setType: (
      state,
      action: PayloadAction<{ type: SliceLoopReceiptType["type"] }>
    ) => {
      state.type = action.payload.type;
    },
    setAddRecepientManually: (
      state,
      action: PayloadAction<{
        addRecepientManually: SliceLoopReceiptType["addRecepientManually"];
      }>
    ) => {
      state.addRecepientManually = action.payload.addRecepientManually;
    },
  },
});

// Reducers and actions
export const { setType: setLoopReceiptType, setAddRecepientManually } =
  loopReceiptSlice.actions;

export default loopReceiptSlice.reducer;
