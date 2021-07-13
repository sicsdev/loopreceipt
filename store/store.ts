import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import themeReducer from "./slices/themeSlice";
import postsReducer from "./slices/postsSlice";
import loopReceiptReducer from "./slices/loopReceiptSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    posts: postsReducer,
    loopReceipt: loopReceiptReducer,
  },
});
export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
