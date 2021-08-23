import { EntityLoopMode, EntityLoopType } from "apiHelpers/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SliceLoopReceiptType {
  type: EntityLoopType;
  mode: EntityLoopMode | undefined;
}
const initialState: SliceLoopReceiptType = {
  type: "internal",
  mode: "single",
};

export const loopReceiptSlice = createSlice({
  name: "loopReceipt",
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<EntityLoopType>) => {
      state.type = action.payload;
    },
    setMode: (state, action: PayloadAction<EntityLoopMode | undefined>) => {
      state.mode = action.payload;
    },
  },
});

// Reducers and actions
export const { setType: setLoopReceiptType, setMode: setLoopReceiptMode } =
  loopReceiptSlice.actions;

export default loopReceiptSlice.reducer;
