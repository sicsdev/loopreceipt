import { SearchItemType } from "@interfaces/SearchItemType";
import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
export interface SliceSearchBarType {
  searchItems: SearchItemType<undefined>[];
  searchItemClickDetector: boolean;
}
const initialState: SliceSearchBarType = {
  searchItems: [],
  searchItemClickDetector: true,
};
export const searchBarSlice = createSlice({
  name: "searchBar",
  initialState,
  reducers: {
    setSearchItems: (
      state,
      action: PayloadAction<{ searchItems: SearchItemType<any>[] }>
    ) => {
      state.searchItems = action.payload.searchItems;
    },
    detectSearchItemClick: (state, action) => {
      state.searchItemClickDetector = !state.searchItemClickDetector;
    },
  },
});
export const { setSearchItems, detectSearchItemClick } = searchBarSlice.actions;
export default searchBarSlice.reducer;
