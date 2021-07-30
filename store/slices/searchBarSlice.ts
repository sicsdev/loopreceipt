import { EntityLooper } from "apiHelpers/types";
import { SearchItemType } from "@interfaces/SearchItemType";

import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidV4 } from "uuid";
export interface SliceSearchBarType {
  searchItems: SearchItemType<undefined>[];
  searchItemClickDetector: boolean;
  confirmedLoopers: (EntityLooper & { id: string })[];
}
const initialState: SliceSearchBarType = {
  searchItems: [],
  searchItemClickDetector: true,
  confirmedLoopers: [],
};
export const searchBarSlice = createSlice({
  name: "searchBar",
  initialState,
  reducers: {
    setSearchItems: (state, action: PayloadAction<SearchItemType<any>[]>) => {
      state.searchItems = action.payload;
    },
    setSearchItemClickDetector: (state, action: PayloadAction<boolean>) => {
      state.searchItemClickDetector = action.payload;
    },
    confirmLooper: (state, action: PayloadAction<{ looper: EntityLooper }>) => {
      state.confirmedLoopers.push({ id: uuidV4(), ...action.payload.looper });
    },
    editConfirmedLooper: (
      state,
      action: PayloadAction<{ looper: EntityLooper & { id: string } }>
    ) => {
      const index = state.confirmedLoopers.findIndex(
        (looper) => looper.id === action.payload.looper.id
      );
      // console.log(index);
      if (index >= 0) {
        state.confirmedLoopers[index] = action.payload.looper;
      }
    },
    deleteConfirmedLooper: (state, action: PayloadAction<{ id: string }>) => {
      state.confirmedLoopers = state.confirmedLoopers.filter(
        (looper) => looper.id !== action.payload.id
      );
    },
  },
});
export const {
  setSearchItems,
  setSearchItemClickDetector,
  confirmLooper,
  editConfirmedLooper,
  deleteConfirmedLooper,
} = searchBarSlice.actions;
export default searchBarSlice.reducer;
