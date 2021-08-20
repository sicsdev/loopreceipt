import { EntityLoopMode, EntityLoopType } from "apiHelpers/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SliceLoopReceiptType {
  type: EntityLoopType;
  mode: EntityLoopMode | undefined;
  addRecepientManually: boolean;
}
const initialState: SliceLoopReceiptType = {
  type: "internal",
  mode: "single",
  addRecepientManually: false,
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
export const {
  setType: setLoopReceiptType,
  setMode: setLoopReceiptMode,
  setAddRecepientManually,
} = loopReceiptSlice.actions;

export default loopReceiptSlice.reducer;
