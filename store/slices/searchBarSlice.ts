import { EntityLooper, EntitySearchedGroup } from "apiHelpers/types";
import { SearchItemType } from "@interfaces/SearchItemType";

import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidV4 } from "uuid";
export interface SliceSearchBarType {
  searchItems: SearchItemType<undefined>[];
  searchItemClickDetector: boolean;
  confirmedLoopers: (EntityLooper & { id: string })[];
  selectedGroupFromSearch: EntitySearchedGroup | undefined;
  searchInput: string;
  searchWithPrimary: boolean;
  searchWithSecondary: boolean;
  searchSpace: string;
  searchItemName: string;
}
const initialState: SliceSearchBarType = {
  searchItems: [],
  searchItemClickDetector: true,
  confirmedLoopers: [],
  selectedGroupFromSearch: undefined,
  searchInput: "",
  searchWithPrimary: true,
  searchWithSecondary: false,
  searchSpace: "",
  searchItemName: "",
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
    setConfirmedLoopers: (
      state,
      action: PayloadAction<{ loopers: EntityLooper[] }>
    ) => {
      state.confirmedLoopers = action.payload.loopers.map((looper) => {
        return {
          id: uuidV4(),
          ...looper,
        };
      });
    },
    setEntitySearchedGroup: (
      state,
      action: PayloadAction<EntitySearchedGroup | undefined>
    ) => {
      state.selectedGroupFromSearch = action.payload;
    },
    setSearchInput: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload;
    },
    setSearchWithPrimary: (state, action: PayloadAction<boolean>) => {
      state.searchWithPrimary = action.payload;
    },
    setSearchWithSecondary: (state, action: PayloadAction<boolean>) => {
      state.searchWithSecondary = action.payload;
    },
    setSearchSpace: (state, action: PayloadAction<string>) => {
      state.searchSpace = action.payload;
    },
    setSearchItemName: (state, action: PayloadAction<string>) => {
      state.searchItemName = action.payload;
    },
    confirmLooper: (state, action: PayloadAction<{ looper: EntityLooper }>) => {
      state.confirmedLoopers.push({ id: uuidV4(), ...action.payload.looper });
    },
    confirmLoopers: (
      state,
      action: PayloadAction<{ loopers: EntityLooper[] }>
    ) => {
      state.confirmedLoopers = [
        ...state.confirmedLoopers,
        ...action.payload.loopers.map((looper) => {
          return {
            id: uuidV4(),
            ...looper,
          };
        }),
      ];
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
  setEntitySearchedGroup,
  setConfirmedLoopers,
  setSearchInput,
  setSearchSpace,
  setSearchItemName,
  setSearchWithPrimary,
  setSearchWithSecondary,
  confirmLooper,
  confirmLoopers,
  editConfirmedLooper,
  deleteConfirmedLooper,
} = searchBarSlice.actions;
export default searchBarSlice.reducer;
