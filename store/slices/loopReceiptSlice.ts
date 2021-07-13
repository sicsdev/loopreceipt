import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: {
  type: "internal" | "external";
} = {
  type: "internal",
};

export const loopReceiptSlice = createSlice({
  name: "loopReceipt",
  initialState,
  reducers: {
    setType: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState>
    ) => {
      state.type = action.payload.type;
    },
  },
});

// Reducers and actions
export const { setType } = loopReceiptSlice.actions;

export default loopReceiptSlice.reducer;
